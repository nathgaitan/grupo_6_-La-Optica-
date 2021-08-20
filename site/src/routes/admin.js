var express = require('express');
const { solOftalAdd, solOftalStore, create, edit } = require('../controllers/adminController');
var router = express.Router();


/* GET home page. */
router.get('/add-solucion-oftalmologica', solOftalAdd);
router.post('/add-solucion-oftalmologica', solOftalStore);
router.get('/crear-producto',create);
router.get('/editar-producto',edit);

module.exports = router;