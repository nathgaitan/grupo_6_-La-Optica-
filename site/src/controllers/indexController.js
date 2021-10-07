const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/* Utils */
let toThousand = require('../utils/toThousand');
let priceFinal = require('../utils/priceFinal');


module.exports = {
    index : (req, res) => {
        return res.render('index', {
            title : "Home",
            products,
            marcas :  require('../data/marcas'),
            priceFinal,
            toThousand

        });
    }
}