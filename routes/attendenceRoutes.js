const express = require('express')
const { createAttendance, markAttendance, getAttendance, getUsers, updateAttendance, fetchSingleCourseStudentAttendance } = require('../controllers/attendenceController')
const auth = require('../middlewares/authentication')
const router = express.Router()

router.post("/:courseId/create-attendance",auth, createAttendance)
router.post("/:attendanceId/mark-attendance", auth, markAttendance)
router.post("/get-attendance/:id", auth, getAttendance)
router.post("/getUsers/:id/:date",auth, getUsers )
router.post("/updateAttendance/:courseId/:id/:date",auth, updateAttendance )
router.post("/get-student-attendance/:courseId",auth, fetchSingleCourseStudentAttendance)

module.exports=router