var express = require('express');
const { detail, list } = require('../controllers/productsController');
var router = express.Router();


/* GET home page. */
router.get('/', list);
router.get('/detalle-de-producto/:id', detail);


module.exports = router;