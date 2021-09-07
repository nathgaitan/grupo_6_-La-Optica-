const { products }  = require('../data/products_db');

/* utils */
let toThousand = require('../utils/toThousand');
let priceFinal = require('../utils/priceFinal');
const capitalize = require('../utils/capitalize');
let { priceMayor, priceMenor, titleDesc, titleAsc, marcaAsc, marcaDesc } = require('../utils/filterListProducts')

module.exports = {
    detail: (req,res)=>{
        const product = products.find(product => product.id ===+req.params.id)
        res.render("products/productDetail",{
            products,
            product,
            toThousand,
            priceFinal
        })
    },
    list : (req, res) => {
        return res.render('products/productsList', {
            title : "Listado de Productos",
            products,
            priceMayor,
            priceMenor,
            titleAsc,
            titleDesc,
            marcaAsc,
            marcaDesc,
            priceFinal,
            toThousand
        });
    },
    
    cart : (req,res) => {
        return res.render('products/cart', {
            title: "Tus Compras!"
        })
    },
   

    terminos : (req,res) => {
        return res.render('products/terminos&condiciones', {
            title: "Terminos y Condiciones"
        })
    },



 }
