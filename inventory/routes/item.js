const express = require("express")

const router = express.Router()
const itemController = require("../controllers/itemController")

router.get('/', itemController.addItemGet)

router.post('/', itemController.addItemPost )

module.exports = router