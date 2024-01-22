const express = require('express');

const route = express.Router();

const categorieController = require("../controller/categorieController");

route.get('/add_categorie',(req,res)=>{
    return res.render('add_categorie');
})
route.post('/addcategorie',categorieController.addCategorie);

route.get('/view_categorie',categorieController.viewCategorie);

route.get('/active/:id',categorieController.active);

route.get('/deactive/:id',categorieController.deactive);

route.get('/deleteItem/:id',categorieController.deleteItem);

route.post('/deleteManyrecord',categorieController.deleteManyrecord);


module.exports = route;