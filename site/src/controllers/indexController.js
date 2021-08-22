const fs = require('fs');
const path = require('path');

/* Data */
const { products } = require('../data/products_db');

const galeria = require('../data/galeria');

/* Utils */
let toThousand = require('../utils/toThousand');
let priceFinal = require('../utils/priceFinal');


module.exports = {
    index : (req, res) => {
        return res.render('index', {
            title : "Home",
            products : JSON.parse(fs.readFileSync(path.join(__dirname,'..', 'data', 'products.json'), 'utf-8')),
            marcas :  require('../data/marcas'),
            galeria,
            priceFinal,
            toThousand

        });
    }
}