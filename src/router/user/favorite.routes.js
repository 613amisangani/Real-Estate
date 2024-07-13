const express = require('express');
const favoritrRoutes =  express.Router();
const{addfavorite, getAllfavorite, removefavorite} = require('../../controller/favorite.controller');
const verifyToken = require('../../helpers/verifyToken');

favoritrRoutes.post("/add",verifyToken,addfavorite);
favoritrRoutes.get("/get",verifyToken,getAllfavorite);
favoritrRoutes.delete("/delete",verifyToken,removefavorite);


module.exports = favoritrRoutes;
