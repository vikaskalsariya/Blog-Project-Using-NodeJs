const mongoose = require('mongoose');
const multer = require('multer');

const path = require('path');
const subCatPath = '/uploads/subcategorie'
const subCatSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    subcaregorie_image : {
        type : String,
        required : true,
    },
    categorieId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "categorie",
        required :true,
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


const SubCatuploadImage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,'..',subCatPath));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now());
    },
})

subCatSchema.statics.subCatImage = multer({storage:SubCatuploadImage}).single('subcategorieImage');
subCatSchema.statics.subCatImagePath =  subCatPath;

const Subcategorie = mongoose.model('Subcategorie',subCatSchema);

module.exports = Subcategorie;