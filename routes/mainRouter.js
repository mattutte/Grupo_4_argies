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

/*** GET HOME ***/ 
router.get('/',mainController.home);



/*** GET ALL PRODUCTS ***/ 
router.get('/productsearch',mainController.productSearch);

/*** GET A PARTICULAR PRODUCT ***/
router.get('/product/:id',mainController.product);

/*** ADD AND EDIT PRODUCT ***/
router.get('/admin',mainController.admin);

router.get('/addProduct',mainController.addProduct);
router.post('/productSearch', upload.array('images'),mainController.store);


router.get('/product/pre_edit/:id',mainController.pre_edit);
router.get('/product/edit/:id',mainController.editProduct);
router.put('/product/:id', upload.single('images-main'),upload.single('images-front'),upload.single('images-back'), mainController.update); // los datos del formulario vienen por body


/*** DELETE ONE PRODUCT***/ 
router.delete('/product/:id', mainController.destroy);

/*** USER ACCESS AND INFO***/ 
router.get('/signin',mainController.signin);
router.get('/signup',mainController.signup);
router.get('/profile',mainController.perfil);

/*** SHOPPING CART ACCESS***/ 
router.get('/shopping-cart',mainController.shoppingcart);




module.exports = router;