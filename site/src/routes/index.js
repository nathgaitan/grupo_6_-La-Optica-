var express = require('express');
var router = express.Router();

const {index, search} = require('../controllers/indexController');

/* GET home page. */
router
    .get('/', index)
    .get('/search', search)

module.exports = router;
