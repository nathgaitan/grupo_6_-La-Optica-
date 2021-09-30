const fs = require('fs');
const path = require('path');
const users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'), 'utf-8'));
const {check, body} = require('express-validator');
const bcrypt = require('bcryptjs'); 

module.exports = [
    check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio'),

    check('apellido')
    .notEmpty().withMessage('El apellido es obligatorio'),

    body('oldpassword')
    .notEmpty().withMessage("Debes ingresar la contraseña para guardar cambios")
    .custom((value,{req}) => {
        let user = users.find(user => user.email === req.session.userLogin.email && bcrypt.compareSync(value, user.password))
        if(user){
            return true
        }else{
            return false
        }
    }).withMessage('Contraseña incorrecta'),

    check('password')
    .custom((value,{req}) => {
        if(value != ""){
            
            if(value.length >= 8 && value.length <= 20){
                return true
            }else{
                return false
            }
        }
        return true
    }).withMessage('La contraseña debe tener entre 8 a 20 caracteres'),

    body('confirmpassword')
    .custom((value,{req}) => {
        if(value !== req.body.password && value.length != 0){
            return false
        }
        return true
    }).withMessage('La confirmación de la contraseña no coincide'),

]