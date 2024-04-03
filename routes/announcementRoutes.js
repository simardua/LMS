const express = require('express')
const { createAnnouncement, editAnnouncement, deleteAnnouncement, fetchAnnouncements, fetchSingleAnnouncement } = require('../controllers/announcementController')
const auth = require('../middlewares/authentication')
const router = express.Router()


router.get('/fetch-single/:announcementId', auth, fetchSingleAnnouncement)
router.post('/create',auth, createAnnouncement)
router.post('/edit/:announcementId',auth, editAnnouncement)
router.delete('/delete/:announcementId',auth, deleteAnnouncement)
router.get('/fetch', fetchAnnouncements)


module.exports = router