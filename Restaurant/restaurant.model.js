const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
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
    location: {
        type: String,
        required: true
    },
    location_en: {
        type: String,
        required: true
    },
    location_ar: {
        type: String,
        required: true
    },
    location_he: {
        type: String,
        required: true
    }, 
    active: {
        type: Boolean,
        default: true
    },
    categories: [ {type : mongoose.Schema.ObjectId, ref : 'category'} ]
});


const categorySchema = new mongoose.Schema({
    restaurantID: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
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
    items: [ {type : mongoose.Schema.ObjectId, ref : 'item'} ]
});

const itemSchema = new mongoose.Schema({
    restaurantID: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
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
    price: {
        type: Number,
        required: false,
        default: 0
    },
    quantity: {
        type: Number,
        required: false,
        default: 0
    },
    url: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        default: true
    },
    additions: [ {type : mongoose.Schema.ObjectId, ref : 'addition'} ]
});


const additionSchema = new mongoose.Schema({
    restaurantID: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
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
    singleChoice: {
        type: Boolean,
        default: true
    },
    additionItems: [ {type : mongoose.Schema.ObjectId, ref : 'additionItem'} ]
});



const additionItemSchema = new mongoose.Schema({
    restaurantID: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
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
    price: {
        type: Number,
        required: false,
        default: 0
    },
    quantity: {
        type: Number,
        required: false,
        default: 0
    },
    isDefault: {
        type: Boolean,
        default: false
    }
});


const restaurantModel = mongoose.model('restaurant', restaurantSchema);
const categoryModel = mongoose.model('category', categorySchema);
const itemModel = mongoose.model('item', itemSchema);
const additionModel = mongoose.model('addition', additionSchema);
const additionItemModel = mongoose.model('additionItem', additionItemSchema);


module.exports = {
    restaurantModel,
    categoryModel,
    itemModel,
    additionModel,
    additionItemModel
}
