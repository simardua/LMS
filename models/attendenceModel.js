const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"course",
        required: true,
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    students: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        present: { type: Boolean, required: true, default: false },
    }],
    date:{
        type: Date,
        default: Date.now(),
        // required: true,
    },
})

const attendanceModel= mongoose.model('attendance', attendanceSchema)
module.exports = attendanceModel