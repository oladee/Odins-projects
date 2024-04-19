const asyncHandler = require("express-async-handler")

const Item = require("../models/item")
const Category = require("../models/category")

exports.itemView = asyncHandler(async (req,res,next)=>{
    var itemCategory = req.params.id

   var list = await Item.find({category : itemCategory}).populate("category", "name").sort({name : 1}).exec()
   var category = await Category.findById(itemCategory)

   res.render("item",{list, title : `${category.name} List`})
})