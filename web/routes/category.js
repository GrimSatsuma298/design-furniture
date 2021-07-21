var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/allProducts.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/* GET users listing. */
router.get('/:category', function(req, res, next) {
  let id = req.params.category;
  let category = products.find(product => product.category == id);
  let categoryIndex = products.findIndex(product => product.category == id) + 1;
  let title = id.toUpperCase() + " LEO DESIGN&FURNITURE";
  res.render('product-category', { 
    title: title, 
    cssFile: 'category',
    listProducts: category,
    index: categoryIndex })

});

module.exports = router;
