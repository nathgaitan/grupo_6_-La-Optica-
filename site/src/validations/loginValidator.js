const {check} = require("express-validator");
const path = require('path');
const users = require ("../data/users.json");
const bcryptjs = require("bcryptjs") ;
const db = require("../database/models");

module.exports = [
    check('email')
    .isEmail().withMessage("Debe ingresar un email valido")
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
    })
]