const express = require("express");
const route = express.Router();
const sliderController = require("../controller/sliderController");
const slider = require('../model/slider');

route.get("/add_slider", sliderController.add_slider);

route.post('/addSlider', slider.sliderImage, sliderController.addSlider);

route.get('/view_slider', sliderController.viewSlider)

route.get('/active/:id',sliderController.active);

route.get('/deactive/:id',sliderController.deactive);

route.get('/deleteItem/:id',sliderController.deleteItem);

route.post('/deleteManyrecord',sliderController.deleteManyrecord);

module.exports = route;