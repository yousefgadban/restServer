const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    restaurantID: {
        type: mongoose.Schema.ObjectId,
        required: true
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
    }
});

const orderModel = mongoose.model('order', orderSchema);


module.exports = {
    orderModel
}