const mongoose = require('mongoose');
const categorieSchema = mongoose.Schema({
    categorie : {
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

const categorie = mongoose.model('categorie',categorieSchema);

module.exports = categorie;