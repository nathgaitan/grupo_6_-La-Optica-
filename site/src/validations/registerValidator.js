const {check, body} = require("express-validator");
const db = require('../database/models')

module.exports = [
    check ("name")
    .notEmpty().withMessage("El nombre es obligatorio"),

    check ("lastName")
    .notEmpty().withMessage("El apellido es obligatorio"),

    check ("email")
    .isEmail().withMessage("Debe ingresar un email válido"),

    body('email')
    .custom( value => {
       
        return db.User.findOne({
            where : {
                email : value
            }
        })
            .then(user => {
                if(user){
                    return Promise.reject('El email ya se encuentra registrado')
                }
            })
    }),


    check ("password")
    .isLength({
        max : 20,
        min : 6
    }).withMessage("La contraseña debe tener un mínimo de 6 y máximo de 20 caracteres"),

    body("password2")
    .isEmpty().withMessage('Debes ingresar la verificación de contraseña')
    .custom((value,{req}) =>{
        if(value !== req.body.password){
            return false
        }
        return true
    }).withMessage("La contraseña debe coincidir"),

    check("terms")
    .isString("on").withMessage("Debes aceptar términos y condiciones")


]