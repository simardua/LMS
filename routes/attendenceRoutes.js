const express = require('express')
const { createAttendance, markAttendance } = require('../controllers/attendenceController')
const router = express.Router()

router.post("/:courseId/create-attendance", createAttendance)
router.post("/:attendanceId/mark-attendance", markAttendance)

module.exports=router