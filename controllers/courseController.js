const courseModel = require("../models/courseModel")

const createCourse=async(req,res)=>{
    const{coursecode, coursename, instructors, studentsEnrolled}=req.body
    try {
        const course = await courseModel.findOne({coursecode})
        if(course){
            res.status(200).send({message: "Course Already Exist", success: false})
        }
        const newCourse = await courseModel.create({
            coursecode, coursename, instructors, studentsEnrolled
        })
        console.log(newCourse)
        return res.status(200).send({message: "Course Created Successfully", success: true, newCourse})
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: `Register Controller ${error.message}`,
        });
    }
}

const fetchCourse= async(req,res)=>{
    const {courseId}= req.params;
    try {
        const course = await courseModel.findOne({ _id: courseId }).populate('instructors').populate('studentsEnrolled')
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


module.exports= {createCourse, fetchCourse}