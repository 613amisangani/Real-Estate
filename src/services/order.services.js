const Order = require('../model/order.model');


module.exports = class OrderServices{

    async newOrder(body,userId){
        try {
            return await Order.create(body,userId);
        } catch (err) {
            console.log(err)
            return err;
        }
    }



    async getAllOrder(query, userID) {
        try {
          let orderItem =
            query.orderId && query.orderId !== ""
              ? [
                  {
                    $match: { _id: new mongoose.Types.ObjectId(query.orderId) },
                  },
                ]
              : [];
          let loginUser =
            query.me && query.me === "true"
              ? [
                  {
                    $match: { user: userID },
                  },
                ]
              : [];
          let pipeline = [
            {
              $match: { isDelete: false },
            },
            ...loginUser,
            ...orderItem,
            {
              $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
                pipeline: [
                  {
                    $project: {
                        Username:1,
                         email: 1,
                    },
                  },
                ],
              },
            },
            {
              $set: { user: { $first: "$user" } },
            },
            {
              $unwind: "$properties",
            },
            {
              $lookup: {
                from: "properties",
                localField: "properties.propertyId",
                foreignField: "_id",
                as: "properties.propertyId",
                pipeline: [
                  {
                    $project: {
                      propertyName: 1,
                      price: 1,
                    },
                  },
                ],
              },
            },
            {
              $set: { "properties.propertyId": { $first: "$properties.propertyId" } },
            },
          ];
    
          let orders = await Order.aggregate(pipeline);
          return orders;
        } catch (err) {
          console.log(err);
          return err;
        }
      }


      async removeOrder(query, userID) {
        try {
          let removeOrder = await Order.findOneAndUpdate(
            {
              user: userID,
              isDelete:false,
            },
            {
              isDelete : true
            },
           
            {
              new: true,
            },
          );
          return removeOrder;
        } catch (err) {
          console.log(err);
          return err.message;
        }
      }
    


}