const mongoose = require('mongoose');
const offerSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    message : {
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

const offer = mongoose.model('offer',offerSchema);

module.exports = offer;