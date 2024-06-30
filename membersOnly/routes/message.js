var express = require('express');
var router = express.Router();
const Message = require('../models/message.model')

/* GET users listing. */
router.get('/newmessage', function(req, res, next) {
  if(req.isAuthenticated()){
    res.status(200).render('message',{title : 'Create new Message'})
  }else{
    res.status(401).redirect('/login')
  }
});

router.post('/newmessage', function(req, res, next) {
  if(req.isAuthenticated()){
    const newMessage = new Message({
      ...req.body, user : req.user.id
    })
    newMessage.save()
    .then((response)=>{
      console.log(response)
      res.redirect('/')
    })
    .catch((err)=>{
      console.log(err)
    })
  }else{
    res.status(401).redirect('/login')
  }
});

module.exports = router;
