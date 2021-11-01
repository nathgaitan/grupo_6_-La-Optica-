const {check} = require("express-validator");
const bcryptjs = require("bcryptjs") ;
const db = require("../database/models");

const regExEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/; // es email

module.exports = [
    check('email')
    .isEmail().withMessage("Debe ingresar un email válido")

    .custom((value) => {
        let isEmail = regExEmail.test(value.trim())
        if(isEmail){
            true
        } else {
            false
        }
    }).withMessage('Debe ingresar un email válido')

    .isString({
        max : 80,
        min : 13
    })

    .custom((value,{req}) => {
        
        return db.User.findOne({
            where : {
                email : value,
            }
        })
            .then(user => {
                if(!user || !bcryptjs.compareSync(req.body.password, user.password)){
                    return Promise.reject()
                }
            })
            .catch( () => Promise.reject('Credenciales inválidas'))
    }),
    check('password')
    .isString({
        max : 20,
        min : 6
    }).withMessage('Credenciales inválidas')

]