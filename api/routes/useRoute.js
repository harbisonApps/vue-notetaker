const express = require("express")
const router = express.Router()
const auth = require('../middleware/auth')
const authController = require("../controllers/authController")

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/me', auth, authController.getUserDetails)
router.get('/logout', authController.logOut)
router.get('/logoutall',authController.logOutAll)

module.exports = router;