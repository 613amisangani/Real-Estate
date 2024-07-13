const reviewServices = require('../services/review.services');
const reviewService = new reviewServices();

exports.addreview = async(req,res)=>{
    try {
        let results = await reviewService.addreview(req.body ,req.user._id);
        res.status(201).json(results);
        
    } catch (error) {
        console.log(error);
        res.json({message : "internal server error"})  
    }
}


exports.getAllreview =  async (req,res) =>{
    try {
      let results =  await reviewService.getAllreview(req.query ,req.user._id);
      if(!results || results.length === 0 )
        return res.json({message:"user have no review"})
      res.status(201).json(results);
    } catch (error) {
      console.log(error);
      res.json({message : "internal server error"})  
    }
  }


  exports.removereview = async (req,res) =>{
    try {
      let results =  await reviewService.removereview(req.query,req.user._id);
      res.status(201).json(results);
      
    } catch (error) {
      console.log(error);
      res.json({message : "internal server error"})  
    }
  }






