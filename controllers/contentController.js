const contentModel = require("../models/contentModel");
const courseModel = require("../models/courseModel");

const addContent = async (req, res) => {
    const { courseId } = req.params;
    const { heading, description, URL, file, media } = req.body;

    try {
        // Check if the course exists
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).send({ message: "Course not found", success: false });
        }

        // Create new content
        const content = await contentModel.findOne({heading})
        if (content) {
            return res.status(200).send({ message: "Content already exist", success: false });
        }
        const newContent = await contentModel.create({
            heading,
            description,
            URL,
            file,
            media
        });

        // Push new content to the course and save the course
        course.courseContent.push(newContent);
        await course.save();

        // Populate course content
        const populatedCourse = await courseModel.findById(courseId).populate('courseContent');

        return res.status(200).send({ message: "Content added successfully", success: true, course: populatedCourse });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: `Add Content Controller ${error.message}`,
        });
    }
};

module.exports = { addContent };
