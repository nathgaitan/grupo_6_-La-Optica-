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
            products,
            marcas :  require('../data/marcas'),
            galeria,
            priceFinal,
            toThousand

        });
    }
}