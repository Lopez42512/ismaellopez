const mongoose = require('mongoose');

// import mongo schema
const Product = require('./models/product');

// Connecting to mongo database using mongo atlus url
mongoose.connect(`url goes here`)


const createProduct = async (req,res,next) => {
    // creating a new product using info provided by user
    const createdProduct = new Product({
        name: req.body.name,
        price: req.body.price
    })
    // Saving new product to database
    const result = await createdProduct.save();
    
    res.json(result);
}

const getProducts = async (req,res,next) => {
    // returning all products in database as json
    const products = await Product.find().exec();
    res.json(products);
}

exports.createProduct = createProduct
exports.getProducts = getProducts