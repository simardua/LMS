const express = require('express')
const{addContent}= require('../controllers/contentController.js')
const auth = require('../middlewares/authentication.js')
const router= express.Router()

router.post('/:courseId/add-content', auth, addContent)

module.exports = router