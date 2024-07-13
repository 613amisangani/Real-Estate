const express = require('express');
const appRoutes = express.Router();
const userRoutes = require('./user.routes');
const propertyRoutes = require('./property.routes');
const favoritrRoutes = require('./favorite.routes');
const orderRoutes = require('./order.routes');
const reviewRoutes = require('./review.routes');

appRoutes.use('/users',userRoutes);
appRoutes.use('/property',propertyRoutes);
appRoutes.use('/favorite',favoritrRoutes);
appRoutes.use('/order',orderRoutes);
appRoutes.use('/review',reviewRoutes);




module.exports = appRoutes;
