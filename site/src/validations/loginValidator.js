const { check, body } = require("express-validator");
const bcryptjs = require("bcryptjs");
const db = require("../database/models");

const regExEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/; // es email

module.exports = [

    check('email')
        .matches(regExEmail).withMessage('Email inválido').bail()
        .isLength({min: 13, max:80}).withMessage('El email debe ser de 13 a 80 caracteres por política de la compañia'),

    body('email')
    .custom((value, { req }) => {
            return db.User
                .findOne({
                    where: {
                        email: value,
                    }
                })
                    .then(user => {
                        if (!user || !bcryptjs.compareSync(req.body.password, user.password)) {
                            return Promise.reject('Credenciales inválidas')
                        }
                    })
                    .catch(() => Promise.reject('Ocurrio un error en el logeo, reintentelo'))
            
        }),
    check('password')
        .isLength({min: 6, max:20}).withMessage('Credenciales inválidas')


]