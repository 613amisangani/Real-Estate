const express = require('express');
const adminRoutes = express.Router();
const upload = require('../../helpers/imageUpload');
const{ registerAdmin, loginAdmin,getProfile,updateProfile,changePassword, deleteadmin }=require('../../controller/admin.controller');
const adminToken = require('../../helpers/adminToken')


adminRoutes.post('/register',upload.single('profileImage'),registerAdmin)
adminRoutes.post('/login',loginAdmin)
adminRoutes.get('/profile',adminToken,getProfile)
adminRoutes.put("/update", adminToken, updateProfile);
adminRoutes.put("/change-password", adminToken, changePassword);
adminRoutes.delete("/delete",adminToken,deleteadmin);



module.exports = adminRoutes;