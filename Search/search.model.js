const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    name_en: {
        type: String,
        required: true
    },
    name_ar: {
        type: String,
        required: true
    },
    name_he: {
        type: String,
        required: true
    }, 
    active: {
        type: Boolean,
        default: true
    }
});

const searchModel = mongoose.model('searches', searchSchema);


module.exports = {
    searchModel
}
