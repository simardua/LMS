const mongoose = require('mongoose')

const courseModel = new mongoose.Schema({
    coursecode: { type: String, required: true, },
    coursename: { type: String, required: true, },
    instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: "users", },],
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "users",
        },
    ],
},
{
    timestamps:true
}
)