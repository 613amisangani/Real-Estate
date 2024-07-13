const jwt = require('jsonwebtoken');
const Admin = require('../model/admin.model');


const adminToken = async(req,res,next)=>{
    try {
        let authorization = req.headers['authorization'];
        if(!authorization){
            return res.json({message : "unauthorize user"});
        }
    
        let token = authorization.split(' ')[1];
        let {adminId} = jwt.verify(token , process.env.SECRET_KEY);
        
        req.admin = await Admin.findById(adminId);
        req.admin ? next() : res.json({message : "admin not found"});
    
    
        
    } catch (err) {
       console.log(err) ;
       res.json({message:"internaml server error"})
    }
    }
    
    module.exports = adminToken;
