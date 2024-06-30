const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messageSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    }
},{timestamps : true})

const message = mongoose.model('message',messageSchema)
module.exports = message