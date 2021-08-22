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



/* method to create*/ 



 
    create : (req,res) => {
        return res.render('admin/product_create-form', {
            title: "Crear producto"
        })
    },

/*method to addProduct*/

addProduct: (req, res) => {
    const{name,marca,price,discount,color,detail,codigo,lens,frame,duration,graduation,category}=req.body;

    let product ={
        id: products[products.length - 1].id + 1,
        name,
        marca,
        imagen: req.file ? req.file.filename :"producto-sin-foto.png",
        price,
        discount,
        color,
        detail,
        codigo, 
        lens,
        frame, 
        duration:null,
        graduation: null, 
        category, 
    }
  

     products.push(product)
     guardar(products)
     return res.redirect('/products')
    }, 

    /*update -form to edit*/



    edit : (req,res) => {
        let product =products.find(product => product.id === +req.params.id)
        return res.render('admin/product_edit-form',{
            product ,title: "editar"
        })
    },

 
/*update -method to update*/

update:(req,res) =>{

    const{name,marca,price,discount,color,detail,codigo,lens,frame,category}=req.body;
    products.forEach(product => {
        if(product.id === +req.params.id){
            product.name = name.trim();
            product.marca = marca.trim();
            product.imagen = req.file ? req.file.filename : product.imagen;
            product.price = +price;
            product.discount = +discount;
            product.color = color.trim();
            product.detail = detail.trim();
            product.codigo = +codigo;
            product.lens = lens;
            product.frame = frame;
            duration = null;
            graduation = null;
            product.category = category;
        }
        
    });

    
    guardar(products)
     return res.redirect('/admin')
},









products : (req, res) => {
    return res.render('admin/productTable', {
        title : "Listado de Productos",
        products,
        priceFinal,
        toThousand
    });
},










}

      
    
