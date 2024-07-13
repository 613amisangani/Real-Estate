const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        properties :[{
            propertyId :{
                type : mongoose.Schema.Types.ObjectId,
                ref : "properties"
            },
            quantity :{
                type : Number,
                default : 1
            },
        },
    ],
    totalAmount :{
        type : Number
    },
    isDelete : {
         type : Boolean,
         default : false,
    }, 
},
{
    versionKey : false,
    timestamps : true,
}
)


module.exports = mongoose.model("orders",OrderSchema);
