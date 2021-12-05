const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    rating: {
        type: Number,
        default: 0
    }, 
    restaurants: [ {type : mongoose.Schema.ObjectId, ref : 'restaurant'} ]
});

// validate: {
//     validator: (str) => str.length === 2,
//     message: "Language must contain only 2 letters"
// }

const userModel = mongoose.model('users', userSchema);


module.exports = {
    userModel
}
