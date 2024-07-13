const mongoose = require('mongoose');
const { type } = require('os');

const UserSchema = mongoose.Schema(
    {
       Username : {
        type : String
       },
       email :{
        type: String,
        unique : true,
       },
       password :{
        type : String,
       },
       mobileNo:{
        type: String,
      },
      profileImage:{
        type : String,
      },
      gender : {
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
});

module.exports = mongoose.model("Users",UserSchema)