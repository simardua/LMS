const mongoose = require('mongoose')

const attendenceSchema = new mongoose.Schema({
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"course",
        required: true,
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true,
    },
    date:{
        type: Date,
        default: Date.now(),
        required: true,
    },
    attendence:{
        type: Boolean,
        default: false,
    },
})

const attendenceModel= mongoose.model('attendence', attendenceSchema)
module.exports = attendenceModel