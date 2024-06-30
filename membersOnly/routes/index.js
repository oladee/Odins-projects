var express = require('express');
var router = express.Router();
const Message = require('../models/message.model')

/* GET home page. */
router.get('/', async function(req, res, next) {
  if(req.isAuthenticated()){
    if(req.user.membershipStatus == 'normal'){
      const messages = await Message.find({}).select('-user').select('-createdAt').exec()
      res.render('index', { title: 'Home', messages });
    }else if(req.user.membershipStatus == 'member' || req.user.membershipStatus == 'admin'){
      const messages = await Message.find({}).exec()
      res.render('index', { title: 'Home', messages });
    }
  }else{
    res.redirect('/login')
  }
});

module.exports = router;
