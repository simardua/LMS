const express=require('express')
const { createEvent } = require('../controllers/eventController')

const router=express.Router()

router.post('/:courseId/create-event',createEvent)

module.exports=router