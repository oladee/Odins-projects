const asyncHandler = require("express-async-handler")

const Item = require("../models/item")
const Category = require("../models/category")

exports.homeView = asyncHandler(async (req,res,next)=>{
    const allItems = await Item.find().sort({name : 1}).exec()
    const allCategory = await Category.find().sort({name : 1}).exec()

    res.render("index",{allItems , allCategory, title : "Welcome", heading : "Inventory Homepage"})
})

