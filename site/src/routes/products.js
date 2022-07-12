const express = require("express");
const {
  detail,
  list,
  cart,
  terminos,
} = require("../controllers/productsController");
const router = express.Router();

/* GET home page. */
router.get("/", list);
router.get("/detalle-de-producto/:id", detail);
router.get("/cart", cart);
router.get("/terminos&condiciones", terminos);

module.exports = router;
