const {body, validationResult} = require('express-validator');
const res = require('express/lib/response');

const productValidation =[
  body('name').notEmpty().withMessage('Falta completar el campo del nombre'),
  body('name').isLength({ max: 50}).withMessage('El campo del Nombre debe ser menos a 200 caracteres'),

  body('category').notEmpty().withMessage('Falta completar el campo de la categoria'),

  body('brand').notEmpty().withMessage('Falta completar el campo de la marca'),

  body('description').notEmpty().withMessage('Falta completar el campo de la descripcion'),
  body('description').isLength({ max: 200}).withMessage('El campo de la Description debe ser menos a 200 caracteres'),

  body('year').notEmpty().withMessage('Falta completar el campo del año'),
  body('year').isNumeric().withMessage('Falta completar el campo del año'),

  body('features_style').notEmpty().withMessage('Falta completar el campo del estilo'),

  body('features_gender').notEmpty().withMessage('Falta completar el campo del genero'),

  body('features_use').notEmpty().withMessage('Falta completar el campo del uso'),

  body('regularPrice').notEmpty().withMessage('Falta completar el campo del precio'),
  body('regularPrice').isNumeric().withMessage('Debes insertar el precio sin punto ni coma'),

  body('specialPrice').isNumeric().withMessage('Debes insertar el precio sin punto ni coma'),

  body('delivery_time').notEmpty().withMessage('Debes seleccionar el tiempo de entrega'),

  body('weight_package').notEmpty().withMessage('Falta completar el campo del peso del paquete'),
  body('weight_package').isNumeric().withMessage('Debes insertar el Peso sin punto ni coma'),

  body('color_available').notEmpty().withMessage('Debes insertar un color'),

  body('size_available').notEmpty().withMessage('Debes seleccionar una talla'), 

  // body('image_main').custom((value, {req}) => {
  //   let file = req.image_main
  //   console.log(req)
  //   // let acceptedExtensions = ['.jpg', '.png', '.jpeg', 'gif']
  //   if (!file) {
  //     throw new Error ('Te falta subir una imagen')
  //   // } else {
  //   //   let extension = (path.extname(filename)).toLowerCase();
  //   //   if (!acceptedExtensions.includes(extension)) {
  //   //     throw new Error ('Solo se permiten archivos tipo Imagen')
  //   //   }
  //   }
  //   return true
  // })
]

module.exports = productValidation;