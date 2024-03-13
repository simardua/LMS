const express = require('express')
const { createAttendence } = require('../controllers/attendenceController')
const router = express.Router()

router.post("/create-attendence", createAttendence)

module.exports=router