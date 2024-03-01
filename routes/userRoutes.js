const express = require('express');
const { userRegister, loginController, fetchAllUsers, fetchUser, signoutController, deleteUser, editUser } = require('../controllers/userController');

const router = express.Router()

router.post("/register", userRegister)
router.post("/login", loginController)
router.get("/users", fetchAllUsers)
router.get("/:userId",fetchUser)
router.post("/signout", signoutController)
router.delete("/:userId/delete", deleteUser)
router.put("/:userId/edit", editUser)

module.exports=router;