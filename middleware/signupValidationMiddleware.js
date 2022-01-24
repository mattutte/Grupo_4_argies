const {check, validationResult} = require('express-validator');
const res = require('express/lib/response');

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
module.exports = validations;