var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/allProducts.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


/* GET all products page. */
router.get('/', function(req, res, next) {
  res.render('products', 
  { title: 'ALL PRODUCTS LEO DESIGN&FURNITURE', 
  cssFile: 'products',
  products: products
 });
});


router.get('/detail/:category/:id', (req, res, next) =>{
  const category = req.params.category;
  const id = req.params.id;

  res.send("" + category + " " + id)
})

module.exports = router;
