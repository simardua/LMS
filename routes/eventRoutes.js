const express=require('express')
const { createEvent, fetchEvents, postController, fetchUserSubmission, getEventData, updateEventSubmissions } = require('../controllers/eventController')
const auth = require('../middlewares/authentication')

const router=express.Router()

router.post('/:courseId/create-event',auth, createEvent)
router.post('/:courseId/get-event',auth ,fetchEvents)
router.post('/post/:id',auth, postController)
router.post('/user-submission/:eventId',auth, fetchUserSubmission)
router.post('/getEvent/:eventId',auth, getEventData)
router.post('/updateEventSubmissions/:eventId',auth, updateEventSubmissions)

module.exports=router