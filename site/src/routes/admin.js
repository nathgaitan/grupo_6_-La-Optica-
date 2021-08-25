var express = require('express');
const { solOftalAdd, solOftalStore, create,update, edit, addProduct,products,detail, solOftalEdit, solOftalUpdate, addContLentes, storeLentesContact,editLentesContact,updateLentesContact } = require('../controllers/adminController');
var router = express.Router();
const path = require('path');


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
    storage
});


/*tabla*/
router.get('/',products);
router.get('/productDetail/:id',detail);

/*crear*/
router.get('/crear-producto',create);
router.post('/crear-producto',upload.single("image"),addProduct);

/*editar*/
router.get('/editar-producto/:id',edit);
router.put('/editar-producto/:id',upload.single("image"),update);

/* crear solucion oftalmologica*/
router.get('/add-solucion-oftalmologica', solOftalAdd);
router.post('/add-solucion-oftalmologica', upload.single("image"), solOftalStore);

/* editar solucion oftalmologica */
router.get('/edit-solucion-oftalmologica/:id', solOftalEdit)
router.put('/edit-solucion-oftalmologica/:id', upload.single("image"), solOftalUpdate);


router.get("/add-contactLentes",addContLentes)
router.post("/add-contactLentes",upload.single("image"),storeLentesContact)

router.get("/edit-contactLentes/:id",editLentesContact)
router.put("/edit-contactLentes/:id",upload.single("image"),updateLentesContact)

module.exports = router;