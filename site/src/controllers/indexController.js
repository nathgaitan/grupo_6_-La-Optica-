const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/* Utils */
let toThousand = require('../utils/toThousand');
let priceFinal = require('../utils/priceFinal');
let capitalize = require('../utils/capitalize');

/* Models */
const db = require('../database/models');
const { Op } = require('sequelize');

/* Validator */
const {validationResult} = require('express-validator');

module.exports = {
    index: (req, res) => {
        let products = db.Product
            .findAll({
                include: [
                    'mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images'
                ]
            })
        let banners = db.View
            .findOne({
                where: {
                    type: 'home'
                },
                include: [
                    {
                        association: 'banners',
                        include: [{ association: 'view' }]
                    }
                ]
            })
        Promise
            .all([products, banners])
            .then(([products, banners]) => {
                return res.render('index', {
                    title: "Home",
                    products,
                    banners : banners.banners,
                    marcas: require('../data/marcas'),
                    priceFinal,
                    toThousand

                })
            })
            .catch(error => console.log(error))
    },
    'search': (req, res) => {
        try {
            db.Product
                .findAll({
                    include: [
                        'mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images'
                    ],
                    where: {
                        [Op.or]: [
                            {
                                name: {[Op.substring]: req.query.busqueda}
                            },
                            {
                                detail: {[Op.substring]: req.query.busqueda}
                            },
                        ]
                    }
                })
                .then(products => {
                    return res.render('search', {
                        title: "Resultado de la búsqueda",
                        products,
                        busqueda: req.query.busqueda,
                        priceFinal,
                        toThousand
                    })
                })
                .catch(error => console.log(error))
        }
        catch (error) {
            return res.status(error.status || 500).json({
                status: error.status || 500,
                errors: error.errors
            })
        }
    },
    
}