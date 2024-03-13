const attendenceModel = require("../models/attendenceModel")

const createAttendence=async(req,res)=>{
    const {courseId} = req.params
    const {studentId, date, attendence} =req.body
    try {
        const attendence = await attendenceModel.findOne({courseId:courseId, studentId:studentId, date:date})
        if (attendence) {
            return res.status(200).json({message:"attendence already created", success: false})
        }
        const newAttendence= await attendenceModel.create({
            course: courseId,
            student: studentId,
            date: date,
            attendence: attendence,
        })
        return res.status(200).send({message:"attendence created successfully", success:true, newAttendence})
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: `createAttendence Controller ${error.message}`,
        });
    }
}

module.exports={createAttendence}