var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

const verifyCallBack = async (username, password, doneFunction)=>{
    const user = await User.findOne({username})
    if(!user){
        return doneFunction(null, false, {message : 'Incorrect Username or Password'})
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        return doneFunction(null, false, {message : 'Incorrect Username or Password'})
    }
    return doneFunction(null, user)
}

const strategy = new LocalStrategy(verifyCallBack)

passport.use(strategy)

passport.serializeUser((user,doneFunction)=>{
    doneFunction(null, user.id)
})

passport.deserializeUser((userId,doneFunction)=>{
    User.findById(userId)
    .then(user =>{
        doneFunction(null, user)
    })
    .catch(err => doneFunction(err))
})