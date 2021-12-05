const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
    restaurantID: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    service: {
        type: String,
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
    }
});

const callModel = mongoose.model('call', callSchema);


module.exports = {
    callModel
}