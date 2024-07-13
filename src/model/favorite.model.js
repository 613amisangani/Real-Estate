const mongoose = require("mongoose");

const FavoriteSchema = mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        properties : [{
            propertyId : {
                type : mongoose.Schema.Types.ObjectId,
                ref: "properties",
            },
            quantity :{
                type : Number,
                default : 1
            },
        },],
        isDelete : {
            type : Boolean,
            default : false,
       },
    },
    {
        versionKey : false,
        timestamps : true,
    }
);

module.exports = mongoose.model("Favorites",FavoriteSchema);