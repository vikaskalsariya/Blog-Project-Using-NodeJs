const mongoose = require('mongoose');
const multer = require('multer');

const path = require('path');
const SliderPath = '/uploads/slider'
const SliderSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    link : {
        type : String,
        required : true,
    },
    slider_image : {
        type : String,
        required : true,
    },
    isActive : {
        type : Boolean,
        required : true,
    },
    createdDate : {
        type : String,
        required : true,
    },
    updatedDate : {
        type : String,
        required : true,
    },
})


const SlideruploadImage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,'..',SliderPath));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now());
    },
})

SliderSchema.statics.sliderImage = multer({storage:SlideruploadImage}).single('sliderImage');
SliderSchema.statics.sliderImagePath =  SliderPath;

const slider = mongoose.model('slider',SliderSchema);

module.exports = slider;