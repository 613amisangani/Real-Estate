const propertyServices = require('../services/property.services');
const propertyService = new propertyServices();


exports.addProperty = async (req, res) => {
    try {
        const { propertyName, price, description, propertyImage ,category,location } = req.body;

       
        let image = "";
        if(req.file)
          image = req.file.path.replace(/\\/g,'/')

       const property = await propertyService.addProperty({
        propertyName,
            price,
            description,
            propertyImage : image,
            category,
            location
        });

        

        res.status(201).json({property , message : "new property is added"});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.getAllProperty =  async (req, res) => {  
    const property = await propertyService.getAllProperty(req.query ,{ isDelete : false});
    res.status(200).json(property);
}



exports.updateProperty = async (req,res) => {
    
    const id = req.params.id;
    let property = await propertyService.getProperty(id);
    // console.log(product);
    if(!property){
        return res.json({meassage : 'property is Not Found...!!!'});
    }
    // product = await ProductModel.findOneAndUpdate({_id:id},{$set : {...req.body}},{new:true});
    property = await propertyService.updateProperty(id,{...req.body});
    // console.log(product);
    res.status(200).json({property, message : "property is Updated..."});
 };


 exports.deleteProperty = async (req, res) => {  
    // console.log(typeof(id))
   
    const id = req.params.id;
    let property = await propertyService.getProperty(id);
   
    if(!property){
        return res.json({message : "property is not found...."});
    }
    

      property = await propertyService.deleteProperty(id,{...req.body})

    console.log(property)
    res.status(200).json({message:'property is deleted....'});
}


