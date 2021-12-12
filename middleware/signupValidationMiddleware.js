const validations =[
    check('email').notEmpty().withMessage('Debe completar un email valido').bail()
                    .isEmail().withMessage('Debe completar un email valido').bail(),
                    
    check('psw').notEmpty().withMessage('Debe completar una clave de al menos 5 cifras').bail()
                .isLength(5).withMessage('Debe completar una clave de al menos 5 cifras').bail(),
    //check('pswrepeat').equals('psw').withMessage('Las passwords deben coincidir').bail(),
    check('pais').notEmpty().withMessage('Debe informar su pais').bail(),
    //check('foto').notEmpty().withMessage('Debe subir su foto'),
    
]
module.exports = validations;