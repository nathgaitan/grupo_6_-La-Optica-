var express = require('express');
const { getcart, add, remove, isStay, isStayAdd, empty, removeProduct } = require('../../controllers/apisController/cartApiController');
var router = express.Router();

/*/apis/cart*/
router
    .get('/get-cart', getcart)
    .get('/add/:id', add)
    .get('/delete/:id', remove)
    .get('/delete-product/:id', removeProduct)
    .get('/empty', empty)
module.exports = router;