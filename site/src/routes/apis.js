const router = require('express').Router()
const {marks,allProduct, filtradoMarks, filtradoCategories, filtradoFrames, filtradoLens, filtradoGraduation, filtradoColor, filtradoProducts} = require('../controllers/apisController/productsController')


router
    .get('/marks',marks)
    
    .get('/product',allProduct)
    .get('/product-filter',filtradoProducts)

    .get('/mark-filter',filtradoMarks)
    .get('/category-filter',filtradoCategories)
    .get('/frame-filter',filtradoFrames)
    .get('/lens-filter',filtradoLens)
    .get('/graduation-filter',filtradoGraduation)
    .get('/color-filter',filtradoColor)













module.exports = router