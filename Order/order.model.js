const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    restaurantID: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    restaurantName: {
        type: String
    },
    table: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        default: () => new Date().getTime()
    },
    status: {
        type: String,
        default: 'new'
    },
    order: {
        type: Object
    },
    price: {
        type: Number,
        default: 0
    },
    delivery: {
        type: String,
        default: 'restaurant'
    },
    userID: {
        type: String
    }
});

const orderModel = mongoose.model('order', orderSchema);


module.exports = {
    orderModel
}