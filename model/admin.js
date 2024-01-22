const mongoose = require('mongoose');
const multer = require('multer');

const path = require('path');
const AdminPath = '/uploads'
const AdminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    gender : {
        type : String,
        required : true,
    },
    hobby : {
        type : Array,
        required : true,
    },
    city : {
        type : String,
        required : true,
    },
    admin_image : {
        type : String,
        required : true,
    },
    message :{
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


const AdminuploadImage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,'..',AdminPath));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now());
    },
})

AdminSchema.statics.AdminImage = multer({storage:AdminuploadImage}).single('AdminImage');
AdminSchema.statics.AdminImagePath =  AdminPath;

const Admin = mongoose.model('Admin',AdminSchema);

module.exports = Admin;