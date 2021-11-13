const { products } = require('../data/products_db');

/* utils */
let toThousand = require('../utils/toThousand');
let priceFinal = require('../utils/priceFinal');
const capitalize = require('../utils/capitalize');
let { priceMayor, priceMenor, titleDesc, titleAsc, marcaAsc, marcaDesc } = require('../utils/filterListProducts')


/* Models */
const db = require('../database/models');

module.exports = {
    detail: (req, res) => {
        let productId = req.params.id;
        let products = db.Product.findAll({
            include: [
                'mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images'
            ]
        })
        let product = db.Product
            .findByPk(productId, {
                include: [
                    'mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images'
                ]
            })
        Promise.all([product, products])
            .then(([product, products]) => {
                return res.render('products/productDetail', {
                    products,
                    product,
                    toThousand,
                    priceFinal
                })
            })
            .catch(error => console.log(error))
    },
    list: (req, res) => {
        let products = db.Product.findAll({
            include: [
                'mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images'
            ]
        })
        let banners = db.View
            .findOne({
                where: {
                    type: 'listar productos'
                },
                include: [
                    {
                        association: 'banners',
                        include: [{ association: 'view' }]
                    }
                ]
            })

        let frames = db.Frame
            .findAll({
                order: [
                    ['name', 'ASC']
                ]
            })
        let marks = db.Mark
            .findAll({
                order: [
                    ['name', 'ASC']
                ]
            })

        let lenses = db.Lens
            .findAll({
                order: [
                    ['name', 'ASC']
                ]
            })
        let colors = db.Color
            .findAll({
                order: [
                    ['name', 'ASC']
                ]
            })

            let categories = db.Category
            .findAll({
                order: [
                    ['name', 'ASC']
                ]
            })
            let graduations = db.Graduation
            .findAll({
                order: [
                    ['name', 'ASC']
                ]
            })
            
        Promise
            .all([products, banners, frames, marks, lenses, colors,categories,graduations])
            .then(([products, banners, frames, marks, lenses, colors,categories,graduations]) => {
                return res.render('products/productsList', {
                    title: 'Listado de Productos',
                    products,
                    categories,
                    graduations,
                    banners: banners.banners,
                    priceFinal,
                    toThousand,
                    frames,
                    marks,
                    lenses,
                    colors,
                    priceMayor,
                    priceMenor,
                    titleAsc,
                    titleDesc,
                    marcaAsc,
                    marcaDesc
                })
            })
            .catch(error => console.log(error))
    },

    cart: (req, res) => {
        return res.render('products/cart', {
            title: "Tus Compras!"
        })
    },


    terminos: (req, res) => {
        return res.render('products/terminos&condiciones', {
            title: "Terminos y Condiciones"
        })
    },



}
