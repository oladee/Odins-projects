var express = require("express")

var router = express.Router()

var categoryControll = require("../controllers/categoryControl")

router.get("/item/:id", categoryControll.itemView)

module.exports = router