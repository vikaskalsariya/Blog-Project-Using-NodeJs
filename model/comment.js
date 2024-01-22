const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const CommentPath = '/uploads/comment'
const CommentSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    postId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "post",
        required :true,
    },
    message : {
        type : String,
        required : true,
    },
    comment_image : {
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


const CommentuploadImage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,'..',CommentPath));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now());
    },
})

CommentSchema.statics.commentImage = multer({storage:CommentuploadImage}).single('userImage');
CommentSchema.statics.commentImagePath =  CommentPath;

const comment = mongoose.model('comment',CommentSchema);

module.exports = comment;