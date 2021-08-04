var express = require('express');
var router = express.Router();
const productController = require('../controllers/productsController');

/* GET all products page. */
router.get('/', productController.all);

// GET product detail
router.get('/detail/:category/:id', productController.detail)

/* GET prodcuts from specific category. */
router.get('/:category', productController.category);
module.exports = router;
