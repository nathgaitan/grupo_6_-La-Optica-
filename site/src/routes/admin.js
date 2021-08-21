var express = require('express');
const { solOftalAdd, solOftalStore, create,update, edit, addProduct } = require('../controllers/adminController');
var router = express.Router();


/* GET home page. */
router.get('/add-solucion-oftalmologica', solOftalAdd);
router.post('/add-solucion-oftalmologica', solOftalStore);

/*crear*/
router.get('/crear-producto',create);
router.post('/crear-producto',addProduct);

/*editar*/
router.get('/editar-producto/:id',edit);
router.put('/editar-producto/:id',update);

/*borrar producto*/

router.get('/delete',destroy);




module.exports = router;