const eventModel = require("../models/eventModel")

const createEvent = async (req, res) => {
    const { courseId } = req.params;
    
    console.log(courseId);

    try {
        // Assuming eventModel is a mongoose model
        const event = await eventModel.create({ ...req.body, courseId: courseId });
        res.status(201).json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}


module.exports ={createEvent}