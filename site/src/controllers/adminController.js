const db = require("../database/models")


/* utils */
let toThousand = require('../utils/toThousand');
let priceFinal = require('../utils/priceFinal');
let capitalize = require('../utils/capitalize');

/* Validations */
const {validationResult} = require('express-validator');

module.exports = {
    /*solOftalAdd: (req, res) => {
        res.render('admin/solOftalmoAdd', {
            title: "Cargar producto",
            products
        })
    },
    solOftalStore: (req, res) => {
        const { name, marca, price, discount, detail, lens } = req.body;
        let product = {
            id: products[products.length - 1].id + 1,
            name: name,
            marca: marca,
            image: req.file ? req.file.filename : "producto-sin-foto.png",
            price: +price,
            discount: +discount,
            color: null,
            detail: detail,
            codigo: null,
            lens: lens,
            frame: null,
            duration: null,
            graduation: null,
            category: "solucion oftalmologica"

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
    solOftalUpdate: (req, res) => {
        const { name, marca, price, discount, detail, lens } = req.body;

        products.forEach(product => {
            if (product.id === +req.params.id) {

                product.name = name;
                product.marca = marca;
                product.image = req.file ? req.file.filename : product.image;
                product.price = +price;
                product.discount = +discount;
                product.color = null;
                product.detail = detail;
                product.codigo = null;
                product.lens = lens;
                product.frame = null;
                product.duration = null;
                product.graduation = null;
                product.category = "solucion oftalmologica"

            }
        })
        guardar(products)
        return res.redirect('/admin')
    },

*/

    /* method to create*/
    create: (req, res) => {
        let categories = db.Category.findAll({
            order : [
                ['name','ASC']
            ]
        })
        let marks = db.Mark.findAll({
            order : [
                ['name','ASC']
            ]
        })
        let color = db.Color.findAll({
            order : [
                ['name','ASC']
            ]
        })
        let lens = db.Lens.findAll({
            order : [
                ['name','ASC']
            ]
        })
        let frame = db.Frame.findAll({
            order : [
                ['name','ASC']
            ]
        })
        let graduation = db.Graduation.findAll({
            order : [
                ['name','ASC']
            ]
        })
        Promise.all(([categories, marks, color, lens, frame,graduation ]))
            .then(([categories, marks, color, lens, frames,graduation  ]) => {
                return res.render('admin/product_create-form',{
                    title: "Crear producto",
                    categories,
                    marks,
                    color,
                    lens,
                    frames,
                    graduation
                })
            })
            .catch(error => console.log(error))
        
    },

    /*method to addProduct*/
    addProduct: (req, res) => {
        const { name, marca, price, discount, color, detail, codigo, lens, frame, category } = req.body;

        db.Product.create(
            {
                name : name.trim(),
                markId : marca,
                price : price,
                discount : discount,
                colorId : color,
                detail : detail,
                code : codigo,
                lensId : lens,
                frameId : frame,
                categoryId : category,
                graduationId : graduation
            }
        )
        let product = {
            
            color,
            detail,
            codigo: +codigo,
            lens,
            frame,
            duration: null,
            graduation: null,
            category,
        }
        products.push(product)
        guardar(products)
        return res.redirect('/admin')
    },

    /*update -form to edit*/
    edit: (req, res) => {
        let product = products.find(product => product.id === +req.params.id)
        return res.render('admin/product_edit-form', {
            product, title: "editar"
        })
    },


    /*update -method to update*/
    update: (req, res) => {

        const { name, marca, price, discount, color, detail, codigo, lens, frame, category } = req.body;
        products.forEach(product => {
            if (product.id === +req.params.id) {
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


    products: (req, res) => {

        db.Product.findAll({
            include : ["Category","Frames","Marks","Images","Lens"]
        })
        .then(products => res.render('admin/productTable', {
            title: "Listado de Productos",
            products,
            priceFinal,
            toThousand,
            capitalize
        }) )
        .catch(error => console.log(error))
        
    },
    /*
    addContLentes: (req, res) => {
        return res.render("admin/contactLentesAdd", { title: "Lentes de contacto" })
    },
    storeLentesContact: (req, res) => {
        const { name, marca, price, discount, color, detail, codigo, lens, frame, duration, graduation, category } = req.body;
        let product = {
            id: products[products.length - 1].id + 1,
            name: name,
            marca: marca,
            image: req.file ? req.file.filename : "producto-sin-foto.png",
            price: +price,
            discount: +discount,
            color: null,
            detail: detail,
            codigo: +codigo,
            lens: lens,
            frame: null,
            duration,
            graduation,
            category,
        }
        products.push(product)
        guardar(products)
        return res.redirect('/admin')
    },
    */

    detail: (req, res) => {
        const product = products.find(product => product.id === +req.params.id)
        res.render("admin/productDetail", {
            products,
            product,
            toThousand,
            priceFinal
        })
    },
/*
    editLentesContact: (req, res) => {
        let product = products.find(producto => producto.id === +req.params.id)
        return res.render('admin/contactLentesEdit', {
            title: "Editar lentes de Contacto",
            product,
            products
        })

    },
    updateLentesContact: (req, res) => {
        const { name, marca, price, discount, color, detail, codigo, lens, frame, duration, graduation, category } = req.body;

        products.forEach(product => {
            if (product.id === +req.params.id) {

                product.name = name.trim();
                product.marca = marca.trim();
                product.image = req.file ? req.file.filename : product.image;
                product.price = +price;
                product.discount = +discount;
                product.color = color;
                product.detail = detail.trim();
                product.codigo = +codigo;
                product.lens = lens;
                product.frame = frame;
                product.duration = duration;
                product.graduation = graduation;
                product.category = category;
            }
        })

        guardar(products)
        return res.redirect('/admin')
    },
*/

    /* destroy product */
    destroy : (req,res) => {
        let { id } = req.params;
        let productDelete = products.find( product => product.id === +id)
        let filenameDelete = productDelete.image
        
        try {
            fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'images', 'products', filenameDelete))
        } catch (err) {
            console.log("Motivo " + err)
        }

        let productSave = products.filter( product => product.id !== +id);
        guardar(productSave);

        return res.redirect('/admin')
    }

}

