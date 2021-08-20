const { products } = require('../data/products_db');
const marcas = require('../data/marcas');
const galeria = require('../data/galeria');

let toThousand = require('../utils/toThousand');
let priceFinal = require('../utils/priceFinal');

module.exports = {
    index : (req, res) => {
        return res.render('index', {
            title : "Home",
            products,
            marcas,
            galeria,
            priceFinal,
            toThousand

        });
    }
}