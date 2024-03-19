const express = require('express')
const{addContent}= require('../controllers/contentController.js')
const router= express.Router()

router.post('/:courseId/add-content', addContent)

module.exports = router