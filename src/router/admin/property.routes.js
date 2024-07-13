const express = require('express');
const propertyRoutes = express.Router();
const upload = require('../../helpers/imageUpload');
const{addProperty, getAllProperty, updateProperty, deleteProperty} = require('../../controller/property.controller')
const adminToken = require('../../helpers/adminToken');

propertyRoutes.post('/add',adminToken,upload.single('propertyImage'),addProperty)
propertyRoutes.get('/get',adminToken,getAllProperty)
propertyRoutes.put('/update',adminToken,updateProperty);
propertyRoutes.delete('/delete',adminToken,deleteProperty)



module.exports = propertyRoutes;