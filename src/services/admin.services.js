const Admin = require('../model/admin.model');

module.exports = class AdminServices{


    async createAdmin(body) {
        try {
          return await Admin.create(body);
        } catch (error) {
          return error.message;
        }
      }
  
      
  
      async findOneAdmin(body) {
        try {
          return await Admin.findOne(body);
        } catch (error) {
          return error.message;
        }
      }
  
      async getProfile(admin) {
                try {
                    return admin;
                } catch (error) {
                    throw error;
                }
            }


            async updateAdmin(id, body) {
              try {
                return await Admin.findByIdAndUpdate(
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
        
  
            async deleteadmin(admin){
              try {
                  
                  const deleteAdmin = await Admin.findByIdAndUpdate(  admin._id,  { $set: { isDelete: true } }, { new: true }
                  );
                  return { message: "admin deleted successfully" };
              } catch (error) {
                  throw error;
              }
          }
  

}