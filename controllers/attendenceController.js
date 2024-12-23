const courseModel = require("../models/courseModel")
const userModel = require("../models/userModel")

const createAttendance = async (req, res) => {
    const { courseId } = req.params;
    const { studentId, date } = req.body;
    try {
        const course = await courseModel.findOne({ _id: courseId });
        if (!course) {
            return res.status(404).json({ message: "Course not found", success: false });
        }

        // Ensure studentsEnrolled is populated
        const students = await userModel.find({ _id: { $in: course.studentsEnrolled } });
        course.studentsEnrolled = students.map(student => student._id);

        let attendanceExists = false;
        const existingAttendance = course.attendance.find(item => {
            const itemDate = new Date(item.date);
            const currentDate = new Date(date);
            return itemDate.getTime() === currentDate.getTime();
        });
        console.log(existingAttendance)
        if (existingAttendance) {
            return res.status(400).json({ success: false, message: 'Attendance already created' });
        }
        course.attendance.push({ date: date });

        await Promise.all(students.map(async (student) => {
            let courseAttendance = student.courseAttendances.find(attendance => attendance.course.toString() === courseId.toString());
            if (!courseAttendance) {
                courseAttendance = { course: courseId, attendance: [] };
                student.courseAttendances.push(courseAttendance);
            }
            let attendanceRecord = courseAttendance.attendance.find(attend => attend.date === date);
            if (attendanceRecord) {
                throw new Error("Attendance already created for this date");
            }
            if (!attendanceRecord) {
                attendanceRecord = { date: date, isPresent: false };
                courseAttendance.attendance.push(attendanceRecord);
            }
            await student.save();
        }));
        await course.save()

        return res.status(200).json({ message: "Attendance created successfully", success: true });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: `createAttendance Controller Error: ${error.message}`,
        });
    }
};



// const createAttendance = async (req, res) => {
//     const { courseId } = req.params
//     const { instructorId, date } = req.body
//     try {
//         const course = await courseModel.findById(courseId)
//         if (!course.instructors.includes(instructorId)) {
//             return res.status(401).json({ message: 'Unauthorized to create attendance' });
//         }

//         const existingAttendance = await attendanceModel.findOne({ courseId, date });
//         if (existingAttendance) {
//             return res.status(400).json({ message: 'Attendance already exists for this date' });
//         }

//         const attendance = new attendanceModel({
//             course: courseId,
//             date: date,
//             instructor: instructorId,
//             students: course.studentsEnrolled.map(studentId => ({
//                 userId: studentId,
//                 present: false
//             }))
//         });
//         await attendance.save();
//         res.status(201).json({ attendance });
//     } catch (error) {
//         return res.status(500).send({
//                      success: false,
//                      message: `create Attendence Controller ${error.message}`,
//                  });
//     }
// };


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



const getAttendance=async(req,res)=>{
    const courseId=req.params.id
    try{
        const course=await courseModel.findOne({_id:courseId})
        if(!courseId){
            return res.status(400).send({success:false,message:'course not found'})
        }
        const attendance=course.attendance;
        return res.status(200).send({success:true,message:'fetched',attendance})

    }catch(error){
        console.log(error.message)
        return res.status(500).send({success:false,message:'Internal Server error'})
    }
}


const getUsers=async(req,res)=>{
    const courseId=req.params.id
    const date=req.params.date
    try{
        const course=await courseModel.findOne({_id:courseId})
        if(!course){
            return res.status(400).send({success:false,message:'course not found'})
        }
        let attendanceDate;
        const students=course.studentsEnrolled;
        let data=[]
        const promises = [];

        course.attendance.forEach(async (item) => {
            if (item?._id.toString() === date.toString()) {
                const attendanceDate = item?.date;

                // Push all promises generated by map into the promises array
                promises.push(...students.map(async (studId) => {
                    const user = await userModel.findOne({ _id: studId });
                    if (user) {
                        let present=0;
                        let absent=0;
                        user.courseAttendances.forEach((course) => {
                            if (course?.course.toString() === courseId.toString()) {
                                course?.attendance.forEach((attend) => {
                                    const itemDate = new Date(attend.date);
                                    const currentDate = new Date(attendanceDate);
                                    if(attend?.isPresent){
                                        present+=1;
                                    }else{
                                        absent+=1;
                                    }
                                
                                    if (itemDate.getTime() === currentDate.getTime()) {
                                        data.push({
                                            firstname: user?.firstname,
                                            lastname: user?.lastname,
                                            date: attendanceDate,
                                            isPresent: attend?.isPresent,
                                            _id: user?._id,
                                            attendanceId: attend?._id,
                                            present:present,
                                            absent:absent
                                        });
                                    }
                                });
                            }
                        });
                    }
                }));
            }
        });

        // Wait for all promises to resolve
        await Promise.all(promises);

        // Now you can log the data
        console.log(data);

        return res.status(200).send({success:true,message:'fetched',data,attendanceDate})
    }catch(error){
        console.log(error.message)
        return res.status(500).send({success:false,message:'Internal Server error'})
    }
}

const updateAttendance = async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.params.id;
    const attendanceId = req.params.date;

    try {
        // Validate user existence
        const user = await userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        // Find the course attendance for the given courseId
        const courseAttendance = user.courseAttendances.find(course => course.course.toString() === courseId.toString());
        if (!courseAttendance) {
            return res.status(400).json({ success: false, message: 'User not enrolled in the course' });
        }

        // Find the attendance record with the given attendanceId
        const attendanceRecord = courseAttendance.attendance.find(record => record._id.toString() === attendanceId.toString());
        if (!attendanceRecord) {
            return res.status(400).json({ success: false, message: 'Attendance record not found' });
        }

        // Update the isPresent property of the attendance record
        attendanceRecord.isPresent = !attendanceRecord.isPresent;

        await user.save();

        return res.status(200).json({ success: true, message: 'Attendance updated successfully' });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


const fetchSingleCourseStudentAttendance = async (req, res) => {
    const { courseId } = req.params;
    const { studentId } = req.body;

    try {
        // Find the user with the given studentId to ensure the student exists
        const user = await userModel.findById(studentId);
        if (!user) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        // Find the attendance record for the provided course and student
        const attendance = await userModel.findOne({
            _id: studentId,
            'courseAttendances.course': courseId
        });

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance not found for the provided course and student.' });
        }

        // Extract attendance for the specified student
        const studentAttendance = attendance.courseAttendances.find(item => item.course.toString() === courseId);

        if (!studentAttendance) {
            return res.status(404).json({ message: 'Attendance not found for the provided student in this course.' });
        }

        // Send the attendance data for the student in this course
        res.json(studentAttendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports={createAttendance, markAttendance,getAttendance,getUsers,updateAttendance, fetchSingleCourseStudentAttendance}