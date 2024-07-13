const OrderServices = require('../services/order.services');
const OrderService = new OrderServices();
const favoriteServices = require('../services/favorite.services');
const favoriteService = new favoriteServices();


exports.createNewOrder = async(req,res)=>{
    try {
        let userfavorite = await favoriteService.getAllfavorite(req.query,req.user._id);
        // res.json(userCarts.carts);
        if(userfavorite.favorites.length === 0){
            return res.json({message:'user have no cart item'});
        }

        let orderItems = userfavorite.favorites.map((item)=>({
            quantity : item.properties.quantity,
              price: item.properties.propertyId.price,
            propertyId : item.properties.propertyId._id,

        }));
        let totalAmount = orderItems.reduce(
            (total,item) => (total += item.quantity * item.price),0
        );

        let newOrder = await OrderService.newOrder(
            {
            //   user:req.user._id,  
              properties: orderItems, 
              totalAmount/*userfavorite.totalAmount*/
            },
            req.user._id
        );

        userfavorite = await favoriteService.updateUser({ isDelete : true},req.user._id);
        res.status(201).json(newOrder);
              
    } catch (err) {
        console.log(err);
        res.json({message:"internal server error"})
        
    }
}


exports.getAllOrder =  async (req,res) =>{
    try {
      let results =  await OrderService.getAllOrder(req.query ,req.user._id);
      if(!results || results.length === 0 )
        return res.json({message:"user have empty carts"})
      res.status(201).json(results);
    } catch (error) {
      console.log(error);
      res.json({message : "internal server error"})  
    }
  }


  exports.removeOrder = async (req,res) =>{
    try {
      let results =  await OrderService.removeOrder(req.query,req.user._id);
      res.status(201).json(results);
      
    } catch (error) {
      console.log(error);
      res.json({message : "internal server error"})  
    }
  }
