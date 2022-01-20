const express = require('express');
const router = express.Router();
//const { check } = require('express-validator');
var validator = require('express-validator');
const { check } = require('express-validator');

const checkAccess = require('../middleware/authMiddleware');
const redirect = require('../middleware/redirect');

// ************ Multer configuration ************
const multer = require('multer'); // require multer
const path = require('path');

var storage = multer.diskStorage({ // configuramos storage con destination y filename
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage }); // generar middleware upload

// ************ Validator configuration ************

const validations = [
    check('email').notEmpty().withMessage('Debe completar un email valido').bail()
                    .isEmail().withMessage('Debe completar un email valido').bail()
                    .custom(value => {
                        const db = require('../database/models');
                        return db.User.findByPk(value).then(user => {
                          if (user) {
                            return ('E-mail debe ser unico');
                          }
                        });
                      }),

    check('psw').notEmpty().withMessage('Debe completar una clave de al menos 8 cifras').bail()
                .isLength(8).withMessage('Debe completar una clave de al menos 8 cifras').bail(),
    //check('pswrepeat').custom((value, { req }) => {
    //    if (value != req.body.psw) {return ('Las passwords deben coincidir')}}).bail(),
    check('pais').notEmpty().withMessage('Debe informar su pais').bail(),
    check('first_name').notEmpty().withMessage('Debe informar su nombre').bail()
                        .isLength(2).withMessage('Su nombre o apellido debe contar con mas de dos letras').bail(),
    check('last_name').notEmpty().withMessage('Debe informar su apellido').bail()
                      .isLength(2).withMessage('Su nombre o apellido debe contar con mas de dos letras').bail(),
    check('facer_pic').notEmpty().withMessage('Debe subir una foto').bail()
                        .custom(function(value, filename) {

                                var extension = (path.extname(filename)).toLowerCase();
                                console.log(extension)
                                if(extension != '.jpg' || extension != '.jpeg' || extension != '.png' || extension != '.gif' ){
                                  return ('Los formatos aceptados son jpg, jpeg y png');
                                }
                                       
                                          
                          })
                        ];








// ************ Controller Require ************
const mainController = require('../controllers/mainController');

/*** GET HOME ***/
router.get('/', mainController.home);



/*** GET ALL PRODUCTS ***/
router.get('/productsearch', mainController.productSearch);

/*** GET A PARTICULAR PRODUCT ***/
router.get('/product/:id', mainController.product);

/*** ADD AND EDIT PRODUCT ***/
router.get('/admin', checkAccess, mainController.admin);

router.get('/addProduct', checkAccess, mainController.addProduct);
router.post('/addProduct', upload.any(), mainController.store);
router.get('/cart', redirect.register, mainController.checkCart);

router.get('/product/pre_edit/:id', checkAccess, mainController.pre_edit);
router.get('/product/edit/:id', checkAccess, mainController.editProduct);
router.put('/product/:id', upload.any(), mainController.update); // los datos del formulario vienen por body


/*** DELETE ONE PRODUCT***/
router.delete('/product/:id', mainController.destroy);

/*** USER ACCESS AND INFO***/

router.get('/signin', mainController.signin);
router.post('/signin', mainController.checksignin);

router.get('/signup', redirect.register, mainController.signup);
router.post('/signup', upload.single('face_pic'), validations, mainController.crearperfil);

router.get('/check', mainController.check);

router.post('/logout', mainController.logout);

router.get('/aboutUs', mainController.aboutUs);

router.get('/account', redirect.account, mainController.account);

router.get('/editAccount', redirect.account, mainController.editAccount);

router.put('/editAccount', mainController.updateAccount);

router.get('/faq', mainController.faq);

// router.get('/editProfile/:id', redirect.account, mainController.editProfile);
// router.post('/editProfile/:id', upload.single('face_pic'), validations, mainController.updateProfile);

/*** SHOPPING CART ACCESS***/
router.get('/shopping-cart', mainController.shoppingcart);

router.get('/test', mainController.test)


module.exports = router;