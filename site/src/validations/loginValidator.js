const { check} = require("express-validator")
const users = require ("../data/users.json")
const bcrypt = require("bcryptjs") 

module.exports = [
    check('email')
    .isEmail().withMessage("Debe ingresar un email valido")
    .custom((value,{req}) => {
        let user = users.find(user => user.email === value.trim() && bcrypt.compareSync(req.body.password.trim(), user.password))
        if(user){
            return true
        }else{
            return false
        }
    }).withMessage('Credenciales inválidas'),


]