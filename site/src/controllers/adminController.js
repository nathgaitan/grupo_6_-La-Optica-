const { products, guardar } = require('../data/products_db');

/* utils */
let toThousand = require('../utils/toThousand');
let priceFinal = require('../utils/priceFinal');

module.exports = {
    solOftalAdd: (req, res) => {
        res.render('admin/solOftalmoAdd', {
            title: "Cargar producto"
        })
    },
    solOftalStore: (req, res) => {
        const { name , marca, price, discount } = req.body;
        let product = {
            id: products[products.length - 1].id + 1,
            name,
            marca,
            image:null,
            price: +price,
            discount: +discount,
            color:null,
            detail,
            codigo:null,
            lente:null,
            marco:null,
        }
        products.push(product)
        guardar(products)
        return res.redirect('/products')
    },
    edit : (req,res) => {
        return res.render('admin/product_edit-form', {
            title: "editar"
        })
    },
    create : (req,res) => {
        return res.render('admin/product_create-form', {
            title: "Crear producto"
        })
    },

    addProduct: (req, res) => {
    const{name,marca,price,discount,color,detail,codigo,lente,marco}=req.body;

    let product ={
        id: products[products.length - 1].id + 1,
        name,
        marca,
        image:null,
        price: +price,
        discount: +discount,
        color,
        detail,
        codigo,
        lente,
        marco,
    }
  

     products.push(product)
     guardar(products)
     return res.redirect('/products')
    }, 

}

      
    
