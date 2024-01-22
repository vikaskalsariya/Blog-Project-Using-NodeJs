const mongoose = require('mongoose');
const multer = require('multer');

const path = require('path');
const postPath = '/uploads/post'
const postSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    cetegory : {
        type : String,
        required : true,
    },
    post_image : {
        type : String,
        required : true,
    },
    description :{
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


const postuploadImage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,'..',postPath));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now());
    },
})

postSchema.statics.postImage = multer({storage:postuploadImage}).single('postImage');
postSchema.statics.postImagePath =  postPath;

const post = mongoose.model('post',postSchema);

module.exports = post;