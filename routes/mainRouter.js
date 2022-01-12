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
                            return ('E-mail ya se encuentra en uso en nuestros registros');
                          }
                        });
                      }),

    check('psw').notEmpty().withMessage('Debe completar una clave de al menos 5 cifras').bail()
                .isLength(5).withMessage('Debe completar una clave de al menos 5 cifras').bail(),
    //check('pswrepeat').custom((value, { req }) => {
    //    if (value != req.body.psw) {return ('Las passwords deben coincidir')}}).bail(),
    check('pais').notEmpty().withMessage('Debe informar su pais').bail(),
    //check('face_pic').notEmpty().withMessage('Debe subir su foto'),
    check('first_name').notEmpty().withMessage('Debe informar su nombre').bail(),
    check('last_name').notEmpty().withMessage('Debe informar su apellido').bail()
    

]








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
router.post('/productSearch', upload.fields([{ name: 'images-main' }, { name: 'images-front' }, { name: 'images-back' }]), mainController.store);
router.get('/cart', redirect.register, mainController.checkCart);

router.get('/product/pre_edit/:id', checkAccess, mainController.pre_edit);
router.get('/product/edit/:id', checkAccess, mainController.editProduct);
router.put('/product/:id', upload.fields([{ name: 'image-main' }, { name: 'image-front' }, { name: 'image-back' }]), mainController.update); // los datos del formulario vienen por body


/*** DELETE ONE PRODUCT***/
router.delete('/product/:id', mainController.destroy);

/*** USER ACCESS AND INFO***/

router.get('/signin', mainController.signin);
router.post('/signin', mainController.checksignin);

router.get('/signup', redirect.account, mainController.signup);
router.post('/signup', upload.single('face_pic'), validations, mainController.crearperfil);

router.get('/check', mainController.check);

router.post('/logout', mainController.logout);

router.get('/aboutUs', mainController.aboutUs);

router.get('/account', redirect.register, mainController.account)

router.get('/faq', mainController.faq)

// router.get('/editProfile/:id', redirect.account, mainController.editProfile);
// router.post('/editProfile/:id', upload.single('face_pic'), validations, mainController.updateProfile);

/*** SHOPPING CART ACCESS***/
router.get('/shopping-cart', mainController.shoppingcart);

router.get('/test', mainController.test)


module.exports = router;