const attendanceModel = require("../models/attendenceModel")
const courseModel = require("../models/courseModel")

// const createAttendence=async(req,res)=>{
//     const {courseId} = req.params
//     const {studentId, date} =req.body
//     try {
//         const attendence = await attendenceModel.findOne({courseId:courseId, studentId:studentId, date:date})
//         if (attendence) {
//             return res.status(200).json({message:"attendence already created", success: false})
//         }
//         const newAttendence= await attendenceModel.create({
//             course: courseId,
//             student: studentId,
//             date: date,
//             attendence: attendence,
//         })
//         return res.status(200).send({message:"attendence created successfully", success:true, newAttendence})
//     } catch (error) {
//         return res.status(500).send({
//             success: false,
//             message: `createAttendence Controller ${error.message}`,
//         });
//     }
// }

const createAttendance = async (req, res) => {
    const { courseId } = req.params
    const { instructorId, date } = req.body
    try {
        const course = await courseModel.findById(courseId)
        if (!course.instructors.includes(instructorId)) {
            return res.status(401).json({ message: 'Unauthorized to create attendance' });
        }

        const existingAttendance = await attendanceModel.findOne({ courseId, date });
        if (existingAttendance) {
            return res.status(400).json({ message: 'Attendance already exists for this date' });
        }

        const attendance = new attendanceModel({
            course: courseId,
            date: date,
            instructor: instructorId,
            students: course.studentsEnrolled.map(studentId => ({
                userId: studentId,
                present: false
            }))
        });
        await attendance.save();
        res.status(201).json({ attendance });
    } catch (error) {
        return res.status(500).send({
                     success: false,
                     message: `create Attendence Controller ${error.message}`,
                 });
    }
};


const markAttendance = async (req, res) => {
    const { attendanceId } = req.params;
    const { studentId } = req.body;
    try {
        const attendance = await attendanceModel.findById(attendanceId);
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        // Check if the student is enrolled in the course
        const studentEnrolled = attendance.students.find(student => student.userId.toString() === studentId);
        if (!studentEnrolled) {
            return res.status(400).json({ message: 'Student is not enrolled in this course' });
        }

        // Check if the student's attendance is already marked
        if (studentEnrolled.present) {
            return res.status(400).json({ message: 'Attendance already marked' });
        }

        // Mark the attendance for the student
        studentEnrolled.present = true;
        await attendance.save();
        res.status(200).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: `Error marking attendance: ${error.message}`,
        });
    }
};




module.exports={createAttendance, markAttendance}