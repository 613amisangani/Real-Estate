const Favorites = require('../model/favorite.model');

module.exports = class favoriteServices{
      

    async addfavorite(body ,userId){
        try {
            let userfavorite = await Favorites.findOne({user : userId,isDelete:false});
            if(!userfavorite){
                return await Favorites.create({
                    user : userId,
                    properties : [
                        {
                            propertyId : body.propertyId,
                            quantity : body.quantity || 1 ,
                        },
                    ],
                });
            } 


            userfavorite.properties.push({
                        propertyId : body.propertyId,
                        quantity : body.quantity 

                    });
            return await userfavorite.save();

        } catch (err) {
            console.log(err);
            return err.message ; 
        }
    }



    async getAllfavorite(query,userID){
        try {
            let favoriteItem = 
            query.favoriteId && query.favoriteId !== ""
            ?[
                {

                    $match : {_id : new mongoose.Types.ObjectId(query.favoriteId)},
                },
            ]
            : [];

            let loginUser = 
            query.me && query.me === "true"
            ?[
                {
                    $match : {user : userID},
                },
            ]
            : [];
            let pipeline = [
                {
                    $match : {isDelete : false},
                },
                ...loginUser,
                ...favoriteItem,
                {
                    $lookup : {
                        from : "users",
                        localField : "user",
                        foreignField : "_id",
                        as : "user",
                        pipeline : [
                            {
                                $project : {
                                    Username : 1,
                                    email : 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $set : { user : {$first : "$user"}},
                },
                {
                    $unwind : "$properties"
                },
                {
                    $lookup : {
                        from : "properties",
                        localField : "properties.propertyId",
                        foreignField : "_id",
                        as : "properties.propertyId",
                        pipeline : [
                            {
                                $project : {
                                    description : 1,
                                    price : 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $set : {"properties.propertyId" : {$first: "$properties.propertyId"}},
                },
            ];

             let favorites = await Favorites.aggregate(pipeline);
            let totalAmount = favorites
            .map((item)=>({
                 quantity: item.properties.quantity,
                price: item.properties.propertyId.price,
            }))
            .reduce((total,item) =>(total += item.quantity * item.price),0);
            let discountAmount = (totalAmount * 0.20);
            totalAmount = totalAmount - (totalAmount * 0.20);
            return{favorites,totalAmount,discount :discountAmount};
            
        } catch (err) {
            console.log(err);
            return err.message ; 

        }
    }


    async updateUser(body,userID){
        try {
            let updateUser = await Favorites.findOneAndUpdate(
                {
                    user :userID,
                    isDelete : false
                },
                {
                    $set:body
                },
                {
                    new : true
                }
            )
            return updateUser;
            
        }  catch (err) {
            console.log(err);
            return err.message ; 
        }
     }
    



    async removefavorite(query,userID){
        try {
            let removefavorite = await Favorites.findOneAndUpdate(
                {
                    user :userID
                },
                {
                    isDelete : true
                },
                {
                    new : true
                }
            )
            return removefavorite;
            
        }  catch (err) {
            console.log(err);
            return err.message ; 
        }
     }
    





}