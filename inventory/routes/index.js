var express = require('express');
var router = express.Router();
var Home = require("../controllers/homeControl")

/* GET home page. */
router.get('/', Home.homeView);

module.exports = router;
