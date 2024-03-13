const mongoose= require('mongoose')
const contentSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    content: {
        type:String
    },
    description:{
        type:String,
    },
},
{timestamps:true}
)

const contentModel= mongoose.model('content', contentSchema)
module.exports = contentModel