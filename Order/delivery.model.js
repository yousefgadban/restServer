const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
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
    },
    orderID: {
        type: String
    },
    senderID: {
        type: String,
        default: ""
    }
});

const deliveryModel = mongoose.model('delivery', deliverySchema);


module.exports = {
    deliveryModel
}