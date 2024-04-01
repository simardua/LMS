const express=require('express')
const { createEvent, fetchEvents, postController, fetchUserSubmission, getEventData, updateEventSubmissions } = require('../controllers/eventController')

const router=express.Router()

router.post('/:courseId/create-event',createEvent)
router.post('/:courseId/get-event',fetchEvents)
router.post('/post/:id',postController)
router.post('/user-submission/:eventId', fetchUserSubmission)
router.post('/getEvent/:eventId', getEventData)
router.post('/updateEventSubmissions/:eventId', updateEventSubmissions)

module.exports=router