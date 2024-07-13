const express = require('express');
const appliRoutes = express.Router();
const adminRoutes = require('./admin.routes');
const propertyRoutes= require('./property.routes');

appliRoutes.use('/admin',adminRoutes);
appliRoutes.use('/property',propertyRoutes);

module.exports = appliRoutes;