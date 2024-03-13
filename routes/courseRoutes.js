const express = require('express');
const { createCourse, fetchCourse, fetchAllCourses, searchCourse, editCourse, deleteCourse } = require('../controllers/courseController');
const router = express.Router()

router.post("/create-course", createCourse)
router.get("/:courseId", fetchCourse)
router.post("/courses", fetchAllCourses)
router.get("/", searchCourse)
router.put("/:courseId/edit", editCourse)
router.delete("/:courseId", deleteCourse)

module.exports = router;