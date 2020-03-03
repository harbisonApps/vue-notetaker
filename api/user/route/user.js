const express = require("express")
const router = express.Router()
const auth = require('../../config/auth')
const userController = require("../controller/userController")

router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/me", auth, userController.getUserDetails)

module.exports = router;