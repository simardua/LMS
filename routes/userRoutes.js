const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage(); // Use memory storage for file upload
const upload = multer({ storage: storage });
const { userRegister, loginController, fetchAllUsers,getUser, fetchUser, signoutController, deleteUser, editUser, searchUser, createAttendance, uploadFileUrl, editPicture, changePassword } = require('../controllers/userController');
const auth = require('../middlewares/authentication');

const router = express.Router()

router.post("/register",auth, userRegister)
router.post("/login", loginController)
router.get("/users",auth, fetchAllUsers)
router.get("/:userId",auth, fetchUser)
router.post("/signout", signoutController)
router.delete("/:userId/delete",auth, deleteUser)
router.put("/:userId/edit",auth, editUser)
router.get("/",auth, searchUser)
router.post('/getUser/:id',auth, getUser)
router.put('/edit-picture/:id', editPicture)
router.put('/change-password/:userId', changePassword)


// router.post("/attendence", createAttendance)

module.exports=router;