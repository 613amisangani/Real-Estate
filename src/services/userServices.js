const User = require('../model/user.model');

module.exports = class UserServices{

    //create user

     async createUser(body){
        try {
            return await User.create(body);
        } catch (error) {
            return error.message;
        }
     }

   
     // find one user

     async findOneUser(body){
        try {
            return await User.findOne(body);
        } catch (error) {
            return error.message;
            
        }
     }

     async getProfile(user) {
        try {
            return user;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id, body) {
        try {
          return await User.findByIdAndUpdate(
            id,
            {
              $set: body,
            },
            {
              new: true,
            }
          );
        } catch (error) {
          return error.message;
        }
      }
  

      async deleteUser(user){
        try {
            
            const deleteUser = await User.findByIdAndUpdate(  user._id,  { $set: { isDelete: true } }, { new: true }
            );
            return { message: "User deleted successfully" };
        } catch (error) {
            throw error;
        }
    }




}