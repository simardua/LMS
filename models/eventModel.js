const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId, ref: "course",
        required: true,
    },
    eventName: { type: String, required: true, },
    eventDescription: { type: String, required: true, },
    startTime: { type: Date, required: true, },
    deadLine: { type: Date, required: true, },
    file: {
        submittedOn: {
            type: Date,

        },
        fileUrl: {
            type: String
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"

    }

},
    {
        timestamps: true
    }
)

const eventModel = mongoose.model('event', eventSchema)
module.exports = eventModel