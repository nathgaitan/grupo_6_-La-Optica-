var express = require('express');
const { create,update, edit, addProduct,products,detail, destroy } = require('../controllers/adminController');
var router = express.Router();

/* middlewares requerir aquí abajo */
const  upload = require('../middlewares/imageProductStorage');


/* validations requerir aquí abajo */
const anteojosValidator = require('../validations/anteojosValidator');
const lentesContactoValidator = require('../validations/lentesContactoValidator');
const soluionesValidator = require('../validations/soluionesValidator');


/*tabla*/
router.get('/',products);
router.get('/productDetail/:id',detail);

/*crear*/
router.get('/crear-producto',create);
router.post('/crear-producto',upload.array("image"),addProduct);

/*editar*/
router.get('/editar-producto/:id',edit);
router.put('/editar-producto/:id',upload.array("image"),update);


/* delete product */
router.delete("/delete/:id", destroy);

module.exports = router;