var express = require('express');
const { create,update, edit, addProduct,products,detail, destroy, listBanner, addBanner, storeBanner, editBanner, updateBanner, destroyBanner } = require('../controllers/adminController');
var router = express.Router();

/* middlewares requerir aquí abajo */
const  upload = require('../middlewares/imageProductStorage');
const uploadB = require('../middlewares/bannerStorage');


/* validations requerir aquí abajo */
const anteojosValidator = require('../validations/anteojosValidator');
const lentesContactoValidator = require('../validations/lentesContactoValidator');
const soluionesValidator = require('../validations/soluionesValidator');
const bannerValidator = require('../validations/bannerValidator');


/*tabla*/
router.get('/',products);
router.get('/productDetail/:id',detail);

/*crear*/
router.get('/crear-producto',create);
router.post('/crear-producto',upload.array("image"),anteojosValidator,addProduct);

/*editar*/
router.get('/editar-producto/:id',edit);
router.put('/editar-producto/:id',upload.array("image"),anteojosValidator,update);


/* delete product */
router.delete("/delete/:id", destroy);

/* banner CRUD */
router
    .get('/banners', listBanner)
    .get('/crear-banner', addBanner)
    .post('/crear-banner', uploadB.single('banner'), bannerValidator, storeBanner)
    .get('/edit-banner/:id', editBanner)
    .put('/edit-banner/:id', uploadB.single('banner'), bannerValidator, updateBanner)
    .delete('/delete-banner/:id', destroyBanner)

module.exports = router;