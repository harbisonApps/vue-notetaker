const express = require("express")
const router = express.Router()
const factController = require('../controllers/factController')
//const auth = require('../middleware/auth')
// const userController = require('../controllers/userController')

router.get('/list', factController.getAllFacts)
//TODO: Add restrictTo functionality
// router.use(userController.restrictTo('admin'))
router.post('/create', factController.factCreate)

router.post('/update/:id', factController.factUpdate)

router.post('/delete/:id',factController.factDelete)
module.exports = router;