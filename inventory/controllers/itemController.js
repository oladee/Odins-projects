const cloudinary = require("cloudinary").v2
const asyncHandler = require("express-async-handler");
const {body, validationResult} = require("express-validator")
var fs = require('fs');

const Category = require("../models/category")
const Item = require("../models/item")


cloudinary.config({
    cloud_name : "oladee",
    api_key : process.env.CLOUDINARY_API_KEY,
    secure : true,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

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
    
    ,asyncHandler( async  (req,res,next)=>{

        const [categories,cate] = await Promise.all([
            Category.find({},"name desc").sort({name : 1}).exec(),
            Category.find({name : req.body.category}).sort({name : 1}).exec()
        ])

        const error = validationResult(req)

        if(!error.isEmpty()){
            res.render("form",{title : " Add an Item", categories, error})
        }else{
            console.log(req.file.path)
            var imgLink = await cloudinary.uploader.upload(req.file.path)
            console.log(imgLink)
            const item = new Item({
            name : req.body.name,
            image : imgLink.secure_url,
            desc : req.body.desc,
            category : cate[0]._id,
            price : req.body.price,
            numberInStock : req.body.numberInStock
        })  
            fs.unlinkSync(req.file.path)
            item.save()
            res.redirect(cate[0].url)
        }
    })
]