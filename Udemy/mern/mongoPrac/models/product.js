const mongoose = require('mongoose');

// Creating a Schema for the database to use when data is entered
const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true}
})

module.exports = mongoose.model('Product', productSchema)