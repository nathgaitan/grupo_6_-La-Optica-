var express = require('express');
const { detail } = require('../controllers/productsController');
var router = express.Router();


/* GET home page. */
router.get('/detalle-de-producto/:id', detail);


module.exports = router;