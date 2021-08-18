const { products }  = require('../data/products_db');

module.exports = {
    detail: (req,res)=>{
        const product = products.find(product => product.id ===+req.params.id)
        res.render("productDetail",{
            products,
            product,
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
    }
    
}