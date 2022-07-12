const { check } = require("express-validator");

module.exports = [
  check("views")
    .notEmpty()
    .withMessage("Debe asignarle una sección donde se visualizara."),
];
