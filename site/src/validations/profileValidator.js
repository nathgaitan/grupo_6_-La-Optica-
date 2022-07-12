const { check, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../database/models");

module.exports = [
  check("name").notEmpty().withMessage("El nombre es obligatorio"),

  check("lastName")
    .notEmpty()
    .withMessage("El apellido es obligatorio"),

  body("password")
    .custom((value, { req }) => {
      if (value !== "") {
        if (value.length >= 6 && value.length <= 12) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    })
    .withMessage(
      "La contraseña debe tener un mínimo de 6 y un máximo de 12 caracteres"
    ),

  body("confirmpassword").custom((value, { req }) => {
    if (req.body.password !== "") {
      if (
        req.body.password.length >= 6 &&
        req.body.password.length <= 12
      ) {
        if (value !== req.body.password) {
          return Promise.reject(
            "La confirmación de la contraseña no coincide"
          );
        }
        return true;
      } else {
        return Promise.reject(
          "El campo anterior debe tener un mínimo de 6 y un máximo de 12 caracteres"
        );
      }
    }
    return true;
  }),

  body("oldpassword")
    .notEmpty()
    .withMessage("Debes ingresar la contraseña para guardar cambios")
    .bail()
    .custom((value, { req }) => {
      return db.User.findByPk(req.session.userLogin.id)
      .then((user) => {
        if (!bcrypt.compareSync(value, user.password)) {
          return Promise.reject("Contraseña incorrecta");
        }
        return true;
      });
    })
    .withMessage("paso algo"),
];
