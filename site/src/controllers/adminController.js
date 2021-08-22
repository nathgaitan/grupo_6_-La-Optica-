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
        const { name , marca, price, discount, detail } = req.body;
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
    solOftalEdit: (req, res) => {
        let product = products.find(producto => producto.id === +req.params.id)
        return res.render('admin/solOftalmoEdit', {
            title: "Editar Soluciones Oftalmológicas",
            product,
            products
        })

    },
    solOftalUpdate : (req,res) => {
        const { name , marca, price, discount, detail } = req.body;

        products.forEach(product => {
            if (product.id === +req.params.id){

                product.name = name.trim();
                product.marca =  marca.trim();
                product.image = req.file ? req.file.filename : "producto-sin-foto.png";
                product.price = +price;
                product.discount = +discount;
                product.color = null;
                product.detail = detail.trim();
                product.codigo = null;
                product.lente = null;
                product.marco = null
            }
        })

        guardar(products)
        return res.redirect('/')
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
        price,
        discount,
        color,
        detail,
        codigo, 
        lens,
        frame, 
        duration, 
        graduation, 
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

    const{name,marca,price,discount,color,detail,codigo,lens,frame,duration,graduation,category}=req.body;
    products.forEach(product => {
        if(product.id === +req.params.id){
            product.name = name;
            product.marca = marca;
            product.price = price;
            product.discount = discount;
            product.color = color;
            product.detail = detail;
            product.codigo = codigo;
            product.lens = lens;
            product.frame = frame;
            product.duration = duration;
            product.graduation = graduation;
            product.category = category;
        }
        
    });

    
    guardar(products)
     return res.redirect('/products')
},









products : (req, res) => {
    return res.render('admin/productsTable', {
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












}

      
    
