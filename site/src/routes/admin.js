var express = require('express');
const { solOftalAdd, solOftalStore, create,update, edit, addProduct,products } = require('../controllers/adminController');
var router = express.Router();



/*crear*/
router.get('/crear-producto',create);
router.post('/crear-producto',addProduct);

/*tabla*/
router.get('/admin/products',products);

/*editar*/
router.get('/editar-producto/:id',edit);


/* crear solucion oftalmologica*/
router.get('/add-solucion-oftalmologica', solOftalAdd);
router.post('/add-solucion-oftalmologica', solOftalStore);

/* editar solucion oftalmologica */
router.get('/edit-solucion-oftalmologica/:id', solOftalEdit)
router.put('/edit-solucion-oftalmologica/:id', upload.single('image'), solOftalUpdate);





module.exports = router;