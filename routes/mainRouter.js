const express = require('express');
const router = express.Router();

// ************ Multer configuration ************
const multer = require('multer'); // require multer
const path = require('path');

var storage = multer.diskStorage({  // configuramos storage con destination y filename
    destination: (req, file, cb)=>{
        cb(null, 'public/images/')
    },
    filename: (req, file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    }
});
const upload = multer({storage: storage}); // generar middleware upload


// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/',mainController.home);

router.get('/product',mainController.product);
router.get('/productsearch',mainController.productSearch);
router.get('/product/add',mainController.addProduct);
router.get('/product/edit',mainController.editProduct);

router.get('/signin',mainController.signin);
router.get('/signup',mainController.signup);
router.get('/profile',mainController.perfil);

router.get('/shopping-cart',mainController.shoppingcart);




module.exports = router;