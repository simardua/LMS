const express= require('express')
const {createAnnouncement, editAnnouncement, deleteAnnouncement, fetchAnnouncements}= require('../controllers/announcementController')
const router =express.Router()

router.post('/create', createAnnouncement)
router.post('/edit', editAnnouncement)
router.delete('/delete', deleteAnnouncement)
router.get('/fetch', fetchAnnouncements)

module.exports=router