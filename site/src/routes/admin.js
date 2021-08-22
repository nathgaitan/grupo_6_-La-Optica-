var express = require('express');
const { solOftalAdd, solOftalStore, create,update, edit, addProduct,products } = require('../controllers/adminController');
var router = express.Router();

const multer = require('multer');



const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        callback(null,'public/images/products')
    },
    filename : (req,file,callback) => {
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
})


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
router.put('/editar-producto/:id',upload.single("lentes"),update);






module.exports = router;