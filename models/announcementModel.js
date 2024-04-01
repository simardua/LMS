const mongoose = require('mongoose')

const announcementSchema = new mongoose.Schema({
    announcement: {
        type: String,
        required: true,
    }
},
{
    timestamps: true
})

const announcementModel= mongoose.model('announcement', announcementSchema)
module.exports = announcementModel