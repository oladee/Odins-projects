const asyncHandler = require("express-async-handler");

const Category = require("../models/category")

// controller for get route
exports.addItemGet= asyncHandler( async(req, res,next)=>{
    var categories = await Category.find({},"name desc").sort({name : 1}).exec()
    res.render("form", {title : " Add an Item", categories})
})

// controller for post route
exports.addItemPost = asyncHandler( async (req,res,next)=>{

})