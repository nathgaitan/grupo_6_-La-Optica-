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
            return db.User
            .findByPk(req.session.userLogin.id)
            
            .then(user => {
                if(!bcryptjs.compareSync(value, user.password)){
                    return Promise.reject()

                }
            })
            
        }
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