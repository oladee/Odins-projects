const asyncHandler = require("express-async-handler");
const {body, validationResult} = require("express-validator")

const Category = require("../models/category")
const Item = require("../models/item")

// controller for get route
exports.addItemGet= asyncHandler( async(req, res,next)=>{
    var categories = await Category.find({},"name desc").sort({name : 1}).exec()
    res.render("form", {title : " Add an Item", categories})
})

// controller for post route
exports.addItemPost = [
    (req,res,next)=>{
        var categoryValue = req.body.category
        if(!Array.isArray(categoryValue)){
            categoryValue = typeof categoryValue === "undefined" ? [] : [categoryValue]
        }
        next()
    }
    // validation using express validator
    ,body('name','Name Must not be Empty')
    .trim()
    .isLength({min : 1})
    .escape()
    // end of validation
    
    ,asyncHandler( async (req,res,next)=>{
        const [categories,cate] = await Promise.all([
            Category.find({},"name desc").sort({name : 1}).exec(),
            Category.find({name : req.body.category}).sort({name : 1}).exec()
        ])
        console.log(cate[0]._id)
        const error = validationResult(req)
        const item = new Item({
            name : req.body.name,
            desc : req.body.desc,
            category : cate[0]._id,
            price : req.body.price,
            numberInStock : req.body.numberInStock
        })

        if(!error.isEmpty()){
            res.render("form",{title : " Add an Item", categories, error})
        }else{
            item.save()
            res.redirect(cate[0].url)
        }
    })
]