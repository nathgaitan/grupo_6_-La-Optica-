const router = require('express').Router()
const {marks,allProduct, filtradoMarks, filtradoFrames, filtradoLens, filtradoGraduation, filtradoColor} = require('../controllers/apisController/productsController')


router
    .get('/marks',marks)
    
    .get('/product',allProduct)
    .get('/mark-filter',filtradoMarks)
    .get('/frame-filter',filtradoFrames)
    .get('/lens-filter',filtradoLens)
    .get('/graduation-filter',filtradoGraduation)
    .get('/color-filter',filtradoColor)













module.exports = router