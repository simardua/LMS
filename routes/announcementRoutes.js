const express = require('express')
const { createAnnouncement, editAnnouncement, deleteAnnouncement, fetchAnnouncements, fetchSingleAnnouncement } = require('../controllers/announcementController')
const router = express.Router()


router.get('/fetch-single/:announcementId', fetchSingleAnnouncement)
router.post('/create', createAnnouncement)
router.post('/edit/:announcementId', editAnnouncement)
router.delete('/delete/:announcementId', deleteAnnouncement)
router.get('/fetch', fetchAnnouncements)


module.exports = router