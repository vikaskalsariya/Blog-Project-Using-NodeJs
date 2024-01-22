const express = require('express');

const subcategorieController = require("../controller/subcategorieController");

const Subcategorie = require('../model/subcategorie')

const route = express.Router();


route.get('/add_Subcategorie',subcategorieController.addSubcategoriePage);


route.post('/addsubcategorie',Subcategorie.subCatImage,subcategorieController.addSubcategorie);

route.get('/view_user_Subcategorie',subcategorieController.viewUserSubcategorie);

route.get('/view_Subcategorie',subcategorieController.viewSubcategorier)


route.get('/active/:id',subcategorieController.active);

route.get('/deactive/:id',subcategorieController.deactive);

route.get('/updateItem/:id',subcategorieController.updateItem);

route.post('/UpdateSubCatData',Subcategorie.subCatImage,subcategorieController.UpdateSubCatData);

route.get('/deleteItem/:id',subcategorieController.deleteItem);

route.post('/deleteManyrecord',subcategorieController.deleteManyrecord);


module.exports = route;