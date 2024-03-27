const express=require('express')
const { createEvent, fetchEvents, postController, fetchUserSubmission } = require('../controllers/eventController')

const router=express.Router()

router.post('/:courseId/create-event',createEvent)
router.post('/:courseId/get-event',fetchEvents)
router.post('/post/:id',postController)
router.post('/user-submission/:eventId', fetchUserSubmission)

module.exports=router