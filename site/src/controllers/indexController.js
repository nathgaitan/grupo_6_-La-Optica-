const { products } = require('../data/lentes_db');

let toThousand = require('../utils/toThousand');
let priceFinal = require('../utils/priceFinal');

module.exports = {
    index : (req, res) => {
        return res.render('index', {
            title : "Home",
            products,
            priceFinal,
            toThousand
        });
    }
}