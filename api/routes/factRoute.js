const express = require("express")
const router = express.Router()
const factController = require('../controllers/factController')
//const userController = require('../../user/controller/userController')

router.get('/list', factController.getAllFacts)
//TODO: Add restrictTo functionality
router.post('/create', factController.factCreate)

router.post('/update/:id', factController.factUpdate)

router.post('/delete/:id',factController.factDelete)
module.exports = router;