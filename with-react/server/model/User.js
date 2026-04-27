const mongoose = require('mongoose');
const { default: uniqueValidator } = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    roles: {
        User: {
            type: Number,
            default: 3456
        }
    },
    password: { type: String, required: true }
})

module.exports = mongoose.model('User', userSchema);