const {check, body} = require("express-validator");


module.exports = [

    check('name')
    .notEmpty()
    .withMessage('El nombre es obligatorio'),

    check('code')
    .notEmpty()
    .withMessage('El codigo es obligatorio'),

    check('color')
    .notEmpty()
    .withMessage('El color es obligatorio'),

    check('lens')
    .notEmpty()
    .withMessage('Debe seleccionar un tipo de lente'),

    check('mark')
    .notEmpty()
    .withMessage('Debe seleccionar una marca'),

    check('frame')
    .notEmpty()
    .withMessage('Debe seleccionar un tipo de marco'),


    check('category')
    .notEmpty()
    .withMessage('Debe seleccionar una categoria'),

    check('graduation')
    .notEmpty()
    .withMessage('Debe seleccionar una graduación'),

   
   /* body('image')
    .custom((value, {req}) => {
        if(req.files[0]){
            return true
        }else{
            return false
        }
    }).withMessage('No ha subido ninguna imagen'),*/

    check('price')
    .notEmpty().withMessage('Debes indicar el precio')
    .isDecimal().withMessage('Debe ser un número'),

    check('detail')
    .notEmpty()
    .withMessage('Debe escribir los detalles del producto '),
]