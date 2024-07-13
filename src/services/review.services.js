const review = require('../model/review.model');

module.exports = class reviewSchema{

    async addreview(body,userId,orderId){
        try {
            let userreview = await review.findOne({user:userId,order:orderId,isDelete:false});
            if(!userreview){
                return await review.create({
                    user : userId,
                    properties : [
                        {
                            propertyId : body.propertyId,
                            rating : body.rating ,
                            review : body.review
                        },
                    ],
                    orders:orderId,
                    
                },);
            }
                userreview.properties.push({
                    propertyId : body.propertyId,
                    rating:body.rating,
                    review:body.review,
                });
                return await userreview.save();
    
            
            
        } catch (err) {
            console.log(err);
            return err.message;
            
        }
    }


    async getAllreview(query,userID){
        try {
            let reviewitem = 
            query.reviewId && query.reviewId !== ""
            ?[
                {
    
                    $match : {_id : new mongoose.Types.ObjectId(query.reviewId)},
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
                ...reviewitem,
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
                                    propertyName:1,
                                    description : 1,
                                    price : 1,
                                    propertyImage : 1,
                                },
                            },
                        ],
                    },
                },
                {
                    $set : {"properties.propertyId" : {$first: "$properties.propertyId"}},
                },
                {
                    $lookup : {
                        from : "orders",
                        localField : "order",
                        foreignField : "_id",
                        as : "order",
                        pipeline : [
                            {
                                $project : {
                                   orderId :1,
                                },
                            },
                        ],
                    },
                },
                {
                    $set : { order : {$first : "$order"}},
                },
    
            ];
    
             let reviews = await review.aggregate(pipeline);
            return{reviews};
            
        } catch (err) {
            console.log(err);
            return err.message ; 
        }
    }
    


    async removereview(query,userID){
        try {
            let removereview = await review.findOneAndUpdate(
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
            return removereview;
            
        }  catch (err) {
            console.log(err);
            return err.message ; 
        }
     }
    
}


