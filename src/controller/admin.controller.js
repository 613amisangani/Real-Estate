const adminServices = require('../services/admin.services');
const adminService = new adminServices();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.registerAdmin = async(req,res) =>{
    try {
        const{
            Name,
            email,
            password,
            profileImage,
            gender, 

        }= req.body

        let admin = await adminService.findOneAdmin({email : email,isDelete : false});
if(admin){
    return res.json({ message: "You are Already Registered....." });
}
 
let image = "";
if(req.file)
  image = req.file.path.replace(/\\/g,'/')

// Encrypt Password
let hashPassword = await bcrypt.hash(password, 10);

admin = await adminService.createAdmin({
    Name,email,password:hashPassword,profileImage:image,gender
});

res.status(201).json(admin);

        
    } catch (err) {
     console.log(err);
     res.status(500).json({message : "Internal Server Error"})
        
    }
}


exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;


        // Check  user exists in database
        const admin = await adminService.findOneAdmin({email : email , isDelete : false});
        if (!admin) {
            return res.status(401).json({ message: "admin not found" });
        }

        // Verify password
        const matchedPassword = await bcrypt.compare(password, admin.password);
        if (!matchedPassword) {
            return res.status(401).json({ message: "password not match" });
        }
        
        // Generate JWT token
        const token = jwt.sign({ adminId: admin._id, email: admin.email }, process.env.SECRET_KEY);

        // Respond with token
        res.json({ token,message : "login success" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.getProfile = async (req, res) => {
    try {
         const adminProfile = await adminService.getProfile(req.admin);


        res.json(adminProfile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}


exports.updateProfile = async (req, res) => {
    try {
      let admin = req.admin;
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      admin = await adminService.updateAdmin(
        admin._id,
        { ...req.body } );
      res.json({admin, message: "Update Success"});
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


  exports.changePassword = async (req,res) => {
    try {
        let admin = req.admin;
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if(oldPassword === newPassword){
            res.json({message: "Your Password Allready Used...."});
        }
        if(newPassword !== confirmPassword){
            res.json({message: "newPassword An confirmPassword Doesn't Match...."});
        }
        let hashPassword = await bcrypt.hash(newPassword, 10);

        admin = await adminService.updateAdmin(
          admin._id,
          { password: hashPassword }
        );
        res.json({admin, message: "Update Success"});
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
      } 
}


exports.deleteadmin = async (req, res) => {
      try {
          const result = await adminService.deleteadmin(req.admin);
          res.json(result);
      } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Internal server error" });
      }
  }


