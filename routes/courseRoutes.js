const express = require('express');
const { createCourse, fetchCourse, fetchAllCourses } = require('../controllers/courseController');
const router = express.Router()

router.post("/create-course", createCourse)
router.get("/:courseId", fetchCourse)
router.get("/", fetchAllCourses)
module.exports= router