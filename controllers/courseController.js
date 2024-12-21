const courseModel = require("../models/courseModel")
const userModel = require("../models/userModel");

const createCourse = async (req, res) => {
    const { coursecode, coursename, instructors, studentsEnrolled, courseImage } = req.body;
    try {
        const course = await courseModel.findOne({ coursecode });
        if (course) {
            return res.status(200).send({ message: "Course Already Exists", success: false });
        } else {
            const newCourse = await courseModel.create({ coursecode, coursename, instructors, studentsEnrolled, courseImage });


            for (const studentId of studentsEnrolled) {
                const user = await userModel.findOne({ _id: studentId });
                if (user) {
                    user.courses.push(newCourse._id);
                    await user.save();
                }
            }
            return res.status(200).send({ message: "Course Created Successfully", success: true, newCourse });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: `Register Controller ${ error.message }`,
        });
}
};

const editCourse = async (req, res) => {
    const { courseId } = req.params;
    const { coursecode, coursename, instructors, studentsEnrolled, courseImage } = req.body;
    try {
        const oldCourse = await courseModel.findOne({ _id: courseId });

        if (!oldCourse) {
            return res.status(404).send({ message: "Course not found", success: false });
        }

        const updatedCourse = await courseModel.updateOne({ _id: courseId }, {
            $set: { coursecode, coursename, instructors, studentsEnrolled, courseImage }
        });

        if (!updatedCourse) {
            return res.status(404).send({ message: "Course not found", success: false });
        }

        const removedStudents = oldCourse.studentsEnrolled.filter(studentId => !studentsEnrolled.includes(studentId));
        const addedStudents = studentsEnrolled.filter(studentId => !oldCourse.studentsEnrolled.includes(studentId));
        console.log('remove', removedStudents)
        console.log('added', addedStudents)
        // Remove courses from removed students
        for (const studentId of removedStudents) {
            const user = await userModel.findOne({ _id: studentId });
            if (user) {
                user.courses = user.courses.filter(course => course.toString() !== courseId);
                await user.save();
            }
        }

        // Add courses for new students enrolled
        for (const studentId of addedStudents) {
            const user = await userModel.findOne({ _id: studentId });
            if (user) {
                user.courses.push(courseId);
                await user.save();
            }
        }

        return res.status(200).send({
            success: true,
            message: "Course edited successfully",
            removedStudents,
            addedStudents,
            course: updatedCourse
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
}

const fetchAllCourses=async(req,res)=>{
    try {
        const courses = await courseModel.find({}).populate('instructors', '-password').populate('studentsEnrolled', '-password')
        if (!courses) {
            return res.status(404).send({ success: false, message: 'No Course Found' })
        }
        return res.status(200).send({ success: true, message: 'Courses fetched', courses })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
}

const fetchCourse= async(req,res)=>{
    const {courseId}= req.params;
    try {
        const course = await courseModel.findOne({ _id: courseId }).populate('instructors', '-password').populate('studentsEnrolled', '-password').populate('courseContent')
        if(!course){
            return res.status(404).send({message: "Course not found", success: false})
        }
        return res.status(200).send({message:"Course fetched successfully", success: true, course})
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: `fetch course controller ${error.message}`,
        });
    }
}


const searchCourse = async (req, res) => {
    try {
        const keyword = req.query.search
            ? {
                $or: [
                    { coursename: { $regex: req.query.search, $options: 'i' } },
                    { coursecode: { $regex: req.query.search, $options: 'i' } },
                ],
            }
            : {};

        const courses = await courseModel.find(keyword);

        res.json({ message: 'Course search successful', success: true, courses });
        console.log(keyword);
    } catch (error) {
        console.error('Error searching for courses:', error);
        res.status(500).json({ message: 'Internal Server Error', success: false, error });
    }
};

const deleteCourse = async(req,res)=>{
    const {courseId} = req.params
    try {
        const response= await courseModel.deleteOne({_id: courseId})
        return res.status(200).send({message:"course deleted successfully", success: true})
    } catch (error) {
        return res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
}



module.exports= {createCourse, fetchCourse, fetchAllCourses, searchCourse, editCourse, deleteCourse}