var express = require('express');
const { solOftalAdd, solOftalStore } = require('../controllers/adminController');
var router = express.Router();


/* GET home page. */
router.get('/add-solucion-oftalmologica', solOftalAdd);
router.post('/add-solucion-oftalmologica', solOftalStore)

module.exports = router;