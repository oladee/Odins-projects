const express = require("express")
const multer = require("multer")
const upload = multer({dest: 'uploads'})

const router = express.Router()
const itemController = require("../controllers/itemController")

router.get('/', itemController.addItemGet)

router.post('/', upload.single('itemImage'),itemController.addItemPost )

module.exports = router