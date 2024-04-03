const express = require('express');
const { createCourse, fetchCourse, fetchAllCourses, searchCourse, editCourse, deleteCourse } = require('../controllers/courseController');
const auth = require('../middlewares/authentication');
const router = express.Router()

router.post("/create-course",auth, createCourse)
router.get("/:courseId",auth, fetchCourse)
router.post("/courses", fetchAllCourses)
router.get("/", searchCourse)
router.put("/:courseId/edit", auth, editCourse)
router.delete("/:courseId",auth, deleteCourse)

module.exports = router;