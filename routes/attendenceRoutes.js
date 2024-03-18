const express = require('express')
const { createAttendance, markAttendance, getAttendance, getUsers, updateAttendance, fetchSingleCourseStudentAttendance } = require('../controllers/attendenceController')
const router = express.Router()

router.post("/:courseId/create-attendance", createAttendance)
router.post("/:attendanceId/mark-attendance", markAttendance)
router.post("/get-attendance/:id", getAttendance)
router.post("/getUsers/:id/:date",getUsers )
router.post("/updateAttendance/:courseId/:id/:date",updateAttendance )
router.post("/get-student-attendance/:courseId", fetchSingleCourseStudentAttendance)

module.exports=router