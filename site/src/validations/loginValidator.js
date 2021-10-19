const { check} = require("express-validator")
const users = require ("../data/users.json")
const bcrypt = require("bcryptjs") ;
const db = require("../database/models")

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
                if(!user || !bcrypt.compareSync(req.body.password, user.password)){
                    return Promise.reject()
                }
            })
            .catch( () => Promise.reject('Credenciales inválidas'))
    })
]