const db = require("../database/models")

const fs = require('fs');
const path = require('path');

/* utils */
let toThousand = require('../utils/toThousand');
let priceFinal = require('../utils/priceFinal');
let capitalize = require('../utils/capitalize');

/* Models */

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
        let category = db.Category.findAll({
            order : [
                ['name','ASC']
            ]
        })
        let mark = db.Mark.findAll({
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
        Promise.all(([category, mark, color, lens, frame,graduation ]))
            .then(([category, mark, color, lens, frame,graduation  ]) => {
                return res.render('admin/product_create-form',{
                    title: "Crear producto",
                    category,
                    mark,
                    color,
                    lens,
                    frame,
                    graduation
                })
            })
            .catch(error => console.log(error))
        
    },

    /*method to addProduct*/
    addProduct: (req, res) => {
        let errors = validationResult(req);
        
        if(errors.isEmpty()){
            const { name, mark, price, discount, color, detail, code, lens, frame, category, graduation } = req.body;

        

        db.Product.create(
            {
                name : name.trim(),
                markId : mark,
                price : price,
                discount : discount,
                colorId : color,
                detail : detail,
                code : code,
                lensId : lens,
                frameId : frame,
                categoryId : category,
                graduationId : graduation
            }
        )
        .then(product => {
            console.log(product);
            if(req.files.length != 0){
                let images = req.files.map(image => {
                    let item = {
                        file : image.filename,
                        productId : product.id
                    }
                    return item
                }) 

                db.Image.bulkCreate(images,{validate : true})
                    .then( () => console.log('imagenes guardadas'))
            }
        return res.redirect('/admin')
    })
    .catch(error => console.log(error))
        }else{
            let category = db.Category.findAll({
                order : [
                    ['name','ASC']
                ]
            })
            let mark = db.Mark.findAll({
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
            Promise.all(([category, mark, color, lens, frame,graduation ]))
                .then(([category, mark, color, lens, frame,graduation  ]) => {
                    return res.render('admin/product_create-form',{
                        title: "Crear producto",
                        category,
                        mark,
                        color,
                        lens,
                        frame,
                        graduation,
                        errores : errors.mapped(),
                        old : req.body
                    })
                })
                .catch(error => console.log(error))
        }
    },

    /*update -form to edit*/
    edit: (req, res) => {
        let category = db.Category.findAll({
            order : [
                ['name','ASC']
            ]
        })
        let mark = db.Mark.findAll({
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
        let product = db.Product.findByPk(req.params.id,{
            include : ["category","mark","color","lens","frame","graduation","images"]
        })
        Promise.all(([category, mark, color, lens, frame,graduation,product ]))
                .then(([category, mark, color, lens, frame,graduation,product  ]) => {
                    return res.render('admin/product_edit-form',{
                        title: "editar",
                        category,
                        mark,
                        color,
                        lens,
                        frame,
                        graduation,
                        product,
                    })
                })
                .catch(error => console.log(error))
    },



    /*update -method to update*/
    update: (req, res) => {
        let errors = validationResult(req);
        
        if(errors.isEmpty()){
            const { name, mark, price, discount, color, detail, code, lens, frame, category, graduation } = req.body;

        

        db.Product.update(
            {
                name : name.trim(),
                markId : mark,
                price : price,
                discount : discount,
                colorId : color,
                detail : detail,
                code : code,
                lensId : lens,
                frameId : frame,
                categoryId : category,
                graduationId : graduation
            },
            {
                where : {
                    id : req.params.id
                }
            }
        )
        .then(response => {
            console.log(response)
            return res.redirect("/admin")
        })
        .catch(error => console.log(error))

    }else{
        let category = db.Category.findAll({
            order : [
                ['name','ASC']
            ]
        })
        let mark = db.Mark.findAll({
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
        let product = db.Product.findByPk(req.params.id,{
            include : ["category","mark","color","lens","frame","graduation","images"]
        })
        Promise.all(([category, mark, color, lens, frame,graduation,product ]))
                .then(([category, mark, color, lens, frame,graduation,product  ]) => {
                    return res.render('admin/product_edit-form',{
                        title: "Editar producto",
                        category,
                        mark,
                        color,
                        lens,
                        frame,
                        graduation,
                        product,
                        errores : errors.mapped(),
                        old : req.body
                    })
                })
                .catch(error => console.log(error))
    }},


    products: (req, res) => {

        db.Product.findAll({
            include : ["category","frame","mark","images","lens"]
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
        db.Product.findByPk(req.params.id,{
            include : ["category","images","mark"]
        })
            .then(product =>{
                return res.render("admin/productDetail", {
                    product,
                    toThousand,
                    priceFinal
            })
            })
            .catch(error => console.log(error))

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
        db.Product.findByPk(req.params.id,{
            include : ["images"]
        })
        .then(products => {
            products.images.forEach(image => {
                if(fs.existsSync(path.join(__dirname,"../../public/images/products",image.file))){
                    fs.unlinkSync(path.join(__dirname,"../../public/images/products",image.file))
                }
            });
            db.Product.destroy({
                where : {
                    id : req.params.id
                }
            })
            .then( () => {
                return res.redirect('/admin')
            })
        })
        .catch(error => console.log(error))

        
    },

    /* ------------ Inicio CRUD banner ------------ */
    
    /* GET /banners */
    listBanner: async (req, res) => {
        try {
            let bannerHome = await db.View
                .findOne({
                    where: {
                        type: 'home'
                    },
                    include: [
                        {
                            association: 'banners',
                            include: [{ association: 'view' }]
                        }
                    ]
                })
            let bannerProductList = await db.View
                .findOne({
                    where: {
                        type: 'listar productos'
                    },
                    include: [
                        {
                            association: 'banners',
                            include: [
                                { association: 'view' }
                            ]
                        }
                    ]
                })
            Promise
                .all([bannerHome, bannerProductList])
                .then(([bannerHome, bannerProductList]) => {
                    return res.render('admin/bannerList', {
                        title: 'Banners',
                        bannerHome: bannerHome.banners,
                        bannerProductList: bannerProductList.banners,
                        capitalize
                    })
                })
                .catch(err => res.send(err))

        }
        catch (error) {
            return res.status(error.status || 500).json({
                status: error.status || 500,
                errors: error.errors
            })
        }
    },
    /* GET /crear-banner */
    addBanner: (req, res) => {
        try {
            db.View
                .findAll({
                    order : [
                        ['type','ASC']
                    ]
                })
                .then(views => {
                    return res.render('admin/banner-create-form', {
                        title: "Crear Banner",
                        views
                    })
                })
        }
        catch (error) {
            console.log(error)
        }

    },
    /* POST /crear-banner */
    storeBanner: (req, res) => {
        try {
            let errors = validationResult(req);

            if (req.fileValidationError || !req.file) {
                let image = {
                    param : 'banner',
                    msg: typeof req.fileValidationError != 'undefined' ? req.fileValidationError : 'Debes ingresar una imagen para el banner',
                }
                errors.errors.push(image)
            }

            if (errors.isEmpty()) {
                const { description, views } = req.body;
                let file = req.file.filename;

                db.Banner
                    .create({
                        file,
                        description: description.trim(),
                        viewId: views,
                    })
                    .then(() => {
                        return res.redirect('/admin/banners')
                    })
                    .catch(err => res.send(err))

            } else {
                db.View
                    .findAll({
                        order : [
                            ['type','ASC']
                        ]
                    })
                    .then(views => {
                        return res.render('admin/banner-create-form', {
                            title: "Crear Banner",
                            views,
                            old: req.body,
                            errors: errors.mapped(),
                        })
                    })
                    .catch(err => res.send(err))
            }
        }
        catch (error) {
            return res.status(error.status || 500).json({
                status: error.status || 500,
                errors: error.errors
            })
        }
    },
    /* GET /edit-banner */
    editBanner: (req, res) => {
        let banner = db.Banner
            .findByPk(req.params.id, {
                include: ['view']
            })
        let views = db.View
            .findAll({
                order : [
                    ['type','ASC']
                ]
            })
        Promise
            .all([banner, views])
            .then(([banner, views]) => {
                return res.render('admin/banner-edit-form', {
                    title: "Edición de banner",
                    banner,
                    views
                })
            })
            .catch(error => {
                return res.status(error.status || 500).json({
                    status: error.status || 500,
                    errors: error.errors
                })
            })
    },
    /* PUT /edit-banner */
    updateBanner: (req, res) => {
        try {
            let errors = validationResult(req);

            if (req.fileValidationError) {
                let image = {
                    param : 'banner',
                    msg: req.fileValidationError,
                }
                errors.errors.push(image)
            }
            if (errors.isEmpty()) {
                const { description, views } = req.body;
                
                db.Banner
                    .findByPk(req.params.id, {
                        include: ['view']
                    })
                    .then( (banner) => {
                        if (typeof req.file != 'undefined') {
                            if (fs.existsSync(path.join(__dirname, '../../public/images/banner/', banner.file))) {
                                fs.unlinkSync(path.join(__dirname, '../../public/images/banner/', banner.file))
                            }
                        } 
                        
                        db.Banner
                            .update({
                                file: typeof req.file == 'undefined' ? banner.file : req.file.filename,
                                description: description.trim(),
                                viewId: views,
                            },
                                {
                                    where: {
                                        id: req.params.id
                                    }
                                }
                            )
                            .then(() => {
                                return res.redirect('/admin/banners')
                            })
                    })
                    .catch(err => res.send(err))
                
            } else {
                let banner = db.Banner
                    .findByPk(req.params.id, {
                        include: ['view']
                    })
                let views = db.View
                    .findAll({
                        order : [
                            ['type','ASC']
                        ]
                    })
                Promise
                    .all([banner, views])
                    .then(([banner, views]) => {
                        return res.render('admin/banner-edit-form', {
                            title: "Edición de banner",
                            banner,
                            views,
                            old: req.body,
                            errors: errors.mapped(),
                        })
                    })
                    .catch(error => res.send(error)) 
            }
        }
        catch (error) {
            return res.status(error.status || 500).json({
                status: error.status || 500,
                errors: error.errors
            })
        }
    },
    /* DELETE /delete-banner */
    destroyBanner: (req, res) => {
        try {
            
            db.Banner.findByPk(req.params.id)
                .then(banner => {
                    if (fs.existsSync(path.join(__dirname, '../../public/images/banner/', banner.file))) {
                        fs.unlinkSync(path.join(__dirname, '../../public/images/banner/', banner.file))
                    }
                });
            db.Banner.destroy({
                where: {
                    id: req.params.id
                }
            })
                .then(() => {
                    return res.redirect('/admin/banners')
                })

                .catch(error => console.log(error))
        }
        catch (error) {
            return res.status(error.status || 500).json({
                status: error.status || 500,
                errors: error.errors
            })
        }
    },
    
    /* ------------ Fin de CRUD banner ------------ */

}

