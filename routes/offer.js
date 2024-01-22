const express = require('express');

const route = express.Router();

const offerController = require("../controller/offerController");

route.get('/add_offer',(req,res)=>{
    return res.render('add_offer');
})

route.get('/view_offer',offerController.viewOffer)

route.post('/addOffer',offerController.addOffer);;

route.get('/active/:id',offerController.active);

route.get('/deactive/:id',offerController.deactive);

route.get('/deleteItem/:id',offerController.deleteItem);

route.post('/deleteManyrecord',offerController.deleteManyrecord);

module.exports = route;