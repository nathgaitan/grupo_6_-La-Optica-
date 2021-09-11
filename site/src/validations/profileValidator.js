const {check, body} = require('express-validator');
const users = require('../data/users.json');
const bcrypt = require('bcryptjs'); 

module.exports = [
    check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio'),

    check('apellido')
    .notEmpty().withMessage('El apellido es obligatorio'),

    body('oldpassword')
    .notEmpty().withMessage("Debes ingresar la contraseña para guardar cambios")
    .custom((value,{req}) => {
        if(value != ""){
            let user = users.find(user => user.email === req.body.email && bcrypt.compareSync(value, user.password))
            if(user){
                return true
            }else{
                return false
            }
        }
        return true
    }).withMessage('Contraseña incorrecta'),

    check('password')
    .custom((value,{req}) => {
        if(value != ""){
            
            if(value.length >= 6 && value.length <= 12){
                return true
            }else{
                return false
            }
        }
        return true
    }).withMessage('La contraseña debe tener un mínimo de 6 y un máximo de 12 caracteres'),

    body('confirmpassword')
    .custom((value,{req}) => {
        if(value !== req.body.password && value.length != 0){
            return false
        }
        return true
    }).withMessage('La confirmación de la contraseña no coincide'),

]