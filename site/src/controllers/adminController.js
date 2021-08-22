const { products, guardar } = require('../data/products_db');

/* utils */
let toThousand = require('../utils/toThousand');
let priceFinal = require('../utils/priceFinal');

module.exports = {
    solOftalAdd: (req, res) => {
        res.render('admin/solOftalmoAdd', {
            title: "Cargar producto",
            products
        })
    },
    solOftalStore: (req, res) => {
        const { name , marca, price, discount, detail, codigo, lens } = req.body;
        let product = {
            id : products[products.length - 1].id + 1,
            name : name,
            marca : marca,
            image : req.file ? req.file.filename : "producto-sin-foto.png",
            price : +price,
            discount : +discount,
            color : null,
            detail : detail,
            codigo : +codigo,
            lens : lens,
            frame : null,
            duration : null,
            graduation : null,
            category : "solucion oftalmologica"

        }
        products.push(product)
        guardar(products)
        return res.redirect('/admin')
    },
    solOftalEdit: (req, res) => {
        let product = products.find(producto => producto.id === +req.params.id)
        return res.render('admin/solOftalmoEdit', {
            title: "Editar Soluciones Oftalmológicas",
            product,
            products
        })

    },
    solOftalUpdate : (req,res) => {
        const { name , marca, codigo, price, discount, detail, lens } = req.body;

        products.forEach(product => {
            if (product.id === +req.params.id){
                
                product.name = name.trim();
                product.marca =  marca.trim();
                product.image = req.file ? req.file.filename : "producto-sin-foto.png";
                product.price = +price;
                product.discount = +discount;
                color = null;
                product.detail = detail.trim();
                product.codigo = +codigo;
                product.lens = lens;
                frame = null;
                duration = null;
                graduation = null;
                category = product.category
            }
        })

        guardar(products)
        return res.redirect('/admin')
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
        image: req.file ? req.file.filename :"producto-sin-foto.png",
        price:+price,
        discount:+discount,
        color,
        detail,
        codigo:+codigo,
        lens,
        frame, 
        duration:null,
        graduation: null, 
        category, 
    }
     products.push(product)
     guardar(products)
     return res.redirect('/admin')
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
            product.image = req.file ? req.file.filename : product.image;
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
}












}

      
    
