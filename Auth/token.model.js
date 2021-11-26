const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    userID: {
        type: String,
        default: 'userID'
    },
    refreshToken: {
        type: String,
        required: true
    }
});

const refreshTokenModel = mongoose.model('refreshToken', refreshTokenSchema);


module.exports = {
    refreshTokenModel
}
