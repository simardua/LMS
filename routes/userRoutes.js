const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage(); // Use memory storage for file upload
const upload = multer({ storage: storage });
const { userRegister, loginController, fetchAllUsers,getUser, fetchUser, signoutController, deleteUser, editUser, searchUser, createAttendance, uploadFileUrl } = require('../controllers/userController');

const router = express.Router()

router.post("/register", userRegister)
router.post("/login", loginController)
router.get("/users", fetchAllUsers)
router.get("/:userId",fetchUser)
router.post("/signout", signoutController)
router.delete("/:userId/delete", deleteUser)
router.put("/:userId/edit", editUser)
router.get("/",searchUser)
router.post('/getUser/:id',getUser)


// router.post("/attendence", createAttendance)

module.exports=router;