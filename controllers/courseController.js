const courseModel = require("../models/courseModel")

const createCourse=async(req,res)=>{
    const{coursecode, coursename, instructors, studentsEnrolled}=req.body
    try {
        const course = await courseModel.findOne({coursecode})
        if(course){
            res.status(200).send({message: "Course Already Exist", success: false})
        }else{
            const newCourse = await courseModel.create({
                coursecode, coursename, instructors, studentsEnrolled
            })
            return res.status(200).send({ message: "Course Created Successfully", success: true, newCourse })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: `Register Controller ${error.message}`,
        });
    }
}

const fetchAllCourses=async(req,res)=>{
    try {
        const courses = await courseModel.find({}).populate('instructors').populate('studentsEnrolled')
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


module.exports= {createCourse, fetchCourse, fetchAllCourses}