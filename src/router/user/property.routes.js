const express = require('express');
const propertyRoutes = express.Router();
const{ getAllProperty} = require('../../controller/property.controller')
const verifyToken = require('../../helpers/verifyToken');


propertyRoutes.get('/get',verifyToken,getAllProperty)


module.exports = propertyRoutes;