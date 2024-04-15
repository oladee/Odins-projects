const mongoose = require('mongoose')

const schema = mongoose.Schema

const categorySchema = new schema({
    name : {
        type : String,
        required : true,
    },
    desc : {
        type : String,
        required : true
    }
})

categorySchema.virtual("url").get(function(){
    return `category/${this.name}`
})

const Category = mongoose.model("Category", categorySchema)

module.exports = Category