const router = require('express').Router()
const passport = require('passport')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

router.get('/register',(req,res,next)=>{
    res.render('register',{title : 'Register', error : ''})
})

router.post('/register',async (req,res,next)=>{
    const user = await User.findOne({username : req.body.username})
    if(user){
        return res.render('register',{title : 'Register', error : 'User Already Exists'})
    }
    else if(req.body.password != req.body.confirmPassword){
        return res.render('register',{title : 'Register', error : 'Password not a match'})
    }
    const salty = Number(process.env.SALT_ROUNDS)
    bcrypt.hash(req.body.password,salty, (err, processedPw)=>{
        if(err){
            next(err)
        }else{
            const newuser = new User({
                ...req.body, password : processedPw
            })
            newuser.save()
            .then(()=>{
                res.redirect('/login')
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    })
})

router.get('/login',(req,res,next)=>{
    console.log(req)
    if(req.session.flash){
        const msg = req.session.flash.error[ req.session.flash.error.length - 1]
        res.status(401).render('login',{title : 'Login', error : msg})
    }else{
        res.render('login',{title : 'Login', error : ''})
    }
    
})

router.post('/login',passport.authenticate('local',{successRedirect : '/', failureFlash : true, failureRedirect : '/login'}))

module.exports = router