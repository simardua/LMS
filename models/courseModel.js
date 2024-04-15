const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    coursecode: { type: String, required: true, },
    coursename: { type: String, required: true, },
    courseImage: { type: String, default: "https://plus.unsplash.com/premium_photo-1681487732859-c2a780022063?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHVycGxlJTIwdGhlbWVkJTIwYm9va3N8ZW58MHx8MHx8fDA%3D" },
    instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: "users", },],
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "users",
        },
    ],
    attendance: [{
        date: {
            type: Date
        }
    }],
    courseContent: [{
        type: mongoose.Schema.Types.ObjectId, ref: "content"
    }]

},
    {
        timestamps: true
    }
)

const courseModel = mongoose.model('course', courseSchema)
module.exports = courseModel