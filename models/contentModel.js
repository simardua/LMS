const mongoose= require('mongoose')
const contentSchema = new mongoose.Schema({
    heading: {
        type: String
    },
    description: {
        type: String
    },
    URL: {
        type: String
    },
    file: {
        type: String
    }
},
{timestamps:true}
)

const contentModel= mongoose.model('content', contentSchema)
module.exports = contentModel