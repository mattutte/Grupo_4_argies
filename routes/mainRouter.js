const express = require('express');
const router = express.Router();
//const { check } = require('express-validator');
var validator = require('express-validator');
const {check} = require('express-validator');

const redirectLogin = require('../middleware/redirectLogin');

// ************ Multer configuration ************
const multer = require('multer'); // require multer
const path = require('path');

var storage = multer.diskStorage({  // configuramos storage con destination y filename
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname, '../public/images/'))
    },
    filename: (req, file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    }
});
const upload = multer({storage: storage}); // generar middleware upload

// ************ Validator configuration ************

const validations =[
    check('email').notEmpty().withMessage('Debe completar un email valido').bail()
                    .isEmail().withMessage('Debe completar un email valido').bail(),
                    
    check('psw').notEmpty().withMessage('Debe completar una clave de al menos 5 cifras').bail()
                .isLength(5).withMessage('Debe completar una clave de al menos 5 cifras').bail(),
    //check('pswrepeat').equals('psw').withMessage('Las passwords deben coincidir').bail(),
    check('pais').notEmpty().withMessage('Debe informar su pais').bail(),
    check('foto').notEmpty().withMessage('Debe subir su foto'),
    
]
    

    





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
router.post('/productSearch', upload.fields([{name:'images-main'},{name:'images-front'},{name:'images-back'}]),mainController.store);
router.get('/cart', mainController.checkCart);

router.get('/product/pre_edit/:id',mainController.pre_edit);
router.get('/product/edit/:id',mainController.editProduct);
router.put('/product/:id', upload.fields([{name:'images-main'},{name:'images-front'},{name:'images-back'}]), mainController.update); // los datos del formulario vienen por body


/*** DELETE ONE PRODUCT***/ 
router.delete('/product/:id', mainController.destroy);

/*** USER ACCESS AND INFO***/ 

router.get('/signin',mainController.signin);
router.post('/signin',mainController.checksignin);

router.get('/signup',mainController.signup);
router.post('/signup', upload.single('foto'), validations ,mainController.crearperfil);

router.get('/check', mainController.check);

router.post('/logout',mainController.logout);

/*** SHOPPING CART ACCESS***/ 
router.get('/shopping-cart',mainController.shoppingcart);




module.exports = router;