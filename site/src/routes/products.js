var express = require('express');
const { detail, list, cart, create, edit } = require('../controllers/productsController');
var router = express.Router();


/* GET home page. */
router.get('/', list);
router.get('/detalle-de-producto/:id', detail);
router.get('/cart', cart);


module.exports = router;