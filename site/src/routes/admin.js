var express = require('express');
const { solOftalAdd, solOftalStore, create,update, edit, addProduct,products } = require('../controllers/adminController');
var router = express.Router();


/* GET home page. */
router.get('/add-solucion-oftalmologica', solOftalAdd);
router.post('/add-solucion-oftalmologica', solOftalStore);

/*crear*/
router.get('/crear-producto',create);
router.post('/crear-producto',addProduct);

/*tabla*/
router.get('/admin/products',products);

/*editar*/
router.get('/editar-producto/:id',edit);







module.exports = router;