const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName: {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    membershipStatus : {
        type : String,
        enum : ['normal', 'member', 'admin'],
        default : 'normal'
    },
})

const user = mongoose.model('user', userSchema)

module.exports = user