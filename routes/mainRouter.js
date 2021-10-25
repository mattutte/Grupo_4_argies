const express = require('express');
const router = express.Router();
// const path=require("path");

const mainController = require('../controllers/mainController');

router.get('/',mainController.home);
router.get('/product',mainController.product);
router.get('/signin',mainController.signin);
router.get('/signup',mainController.signup);
router.get('/shopping-cart',mainController.shoppingcart);
router.get('/productsearch',mainController.productSearch);

module.exports = router;