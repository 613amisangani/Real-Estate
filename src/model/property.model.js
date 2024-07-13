const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema(
    {
        propertyName :{
            type : String
        },
        price :{
            type : Number
        },
        description : {
            type : String
        },
        propertyImage :{
            type : String
        },
        category :{
            type : String,
            enum : ['House','Villa','Apprtment']
        },
        location:{
              type : String,
        },
        isDelete:{
            type:Boolean,
            default: false,
        }
    },
    {
        versionKey : false,
        timestamps : true,
    }
)

module.exports = mongoose.model("property",PropertySchema);