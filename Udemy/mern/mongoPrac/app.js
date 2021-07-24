const express = require('express');

const app = express();
// const {createProduct, getProducts} = require("./mongo")
const {createProduct, getProducts} = require("./mongoose")

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/products', createProduct);

app.get("/products", getProducts);

app.listen(3000);