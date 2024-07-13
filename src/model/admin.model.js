const mongoose = require('mongoose');

const adminSchema = mongoose.Schema(
    {
        Name :{
            type:String
        },
        email :{
            type : String,
            unique : true,
        },
        password:{
             type : String,
        },
        profileImage:{
            type : String,
        },
        gender:{
            type:String,
            enum :["Male","Female"]
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
);

module.exports = mongoose.model("admins",adminSchema);