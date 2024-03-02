const express = require('express');
const { createCourse, fetchCourse } = require('../controllers/courseController');
const router = express.Router()

router.post("/create-course", createCourse)
router.get("/:courseId", fetchCourse)
module.exports= router