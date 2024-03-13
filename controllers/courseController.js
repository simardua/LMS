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

const editCourse =async(req,res)=>{
    const {courseId}=req.params
    const {coursecode, coursename, instructors, studentsEnrolled}=req.body
    try {
        const course = await courseModel.updateOne({_id : courseId},{
            $set:
            {coursecode:coursecode, coursename:coursename, instructors: instructors, studentsEnrolled: studentsEnrolled}
        })
        if (!course) {
            return res.status(404).send({message:"course not found", success: false})
        }
        return res.status(200).send({success:true, message:"course edited", course})
    } catch (error) {
        return res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
}

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