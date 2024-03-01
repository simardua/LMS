const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        default: null,
        min: 8,
    },
    branch:{
        type: String,
        required: true
    },
    accountType: {
        type: String,
        enum: ["Admin", "Student", "Instructor"],
        // required: true,
    },
    token: String,
},
{timestamps: true}
)

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;