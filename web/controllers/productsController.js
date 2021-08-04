const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/allProducts.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
  all: (req, res) => {
    res.render("products", {
      title: "ALL PRODUCTS LEO DESIGN&FURNITURE",
      cssFile: "products",
      products: products,
    });
  },
  detail: (req, res) =>{
    const category = req.params.category;
    const id = req.params.id;
  
    const productsCategory = products.find(p=> p.category == category)
    const productDetail = productsCategory.product.find(p=> p.id == id)
  
    res.render('detail', {
      title: "DETAIL LEO DESIGN&FURNITURE",
      cssFile: 'detail',
      category: category,
      detail: productDetail
    })
  },
  category: (req, res) =>{
    let id = req.params.category;
    let category = products.find(product => product.category == id);
    let categoryIndex = products.findIndex(product => product.category == id) + 1;
    let title = id.toUpperCase() + " LEO DESIGN&FURNITURE";
    res.render('product-category', { 
      title: title, 
      cssFile: 'category',
      listProducts: category,
      index: categoryIndex })
  }
}

module.exports = controller;
