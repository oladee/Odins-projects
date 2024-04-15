const mongoose = require("mongoose")

const schema = mongoose.Schema

const itemSchema = new schema({
    name : {
        type : String,
        required : [true, "Item name required"]
    },
    desc : {
        type : String,
        required : [true, "please give a proper description of the item"],
        minLength : [3, "Length must be greater than 3 characters"]
    },
    category : {
        type : [{type : schema.Types.ObjectId, ref : 'Category'}],
        required : [true, "Item category required"]
    },
    price : {
        type : Number,
        required : [true, "please give a price"]
    },
    numberInStock : {
        type : Number,
        required : [true, "please give a value for how many are in stock"]
    }
})

itemSchema.virtual("url").get(function (){
    return `item/${this._id}`
})

module.exports = mongoose.model("item", itemSchema)