const express=require('express')
const { createEvent, fetchEvents, postController } = require('../controllers/eventController')

const router=express.Router()

router.post('/:courseId/create-event',createEvent)
router.post('/:courseId/get-event',fetchEvents)
router.post('/post/:id',postController)

module.exports=router