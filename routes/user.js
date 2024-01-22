const express = require('express');

const route = express.Router();

const userController = require('../controller/userController');

route.get('/',userController.home);

route.get('/singlePost/:id',userController.singlePost)

// categorie    
route.use("/categorie",require("./categorie"));

// categorie    
route.use("/subcategorie",require("./subcategorie"));

module.exports = route;
