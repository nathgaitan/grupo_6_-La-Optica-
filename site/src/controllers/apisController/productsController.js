
const db = require('../../database/models');
const { Op } = require('sequelize');



const throwError = (res, error) => {
    return res.status(error.status || 500).json({
        status: error.status || 500,
        errors: error.errors
    })
}


module.exports = {
    marks: async (req,res) => {

        try {
            let marks = await db.Mark.findAll({
                order : [
                    ['name']
                ]
            })
    
            let response = {
                status : 200,
                meta : {
                    total: marks.length,
                    data: marks,
                    status:200
                }        
        }
        return res.status(200).json(response) 
        } catch (error) {
            throwError(res, error)

        }
    },

    
    

    
    filtradoProducts: async (req,res) => {
        console.log(req.query)

        let productos
        try {
            if(req.query.filter !== 0 ){
               productos = await db.Product.findAll({
                where : {
                    markId : req.query.filter ,

                },
                limit: +req.query.limit,
                    include : ['mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images']
                }) 
            }else if(req.query.filter === 0  ){

                productos = await db.Product.findAll({
                    
                    limit: +req.query.limit,
                        include : ['mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images']
                    })
            }else{
                productos = await db.Product.findAll({
                    limit: +req.query.limit,

                    include : ['mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images']
                })
            }
            
    
            let response = {
                status : 200,
                meta : {
                    total: productos.length,
                    status:200,
                    
                },
                data: productos
                
    
        }
        return res.status(200).json(response)
        } catch (error) {
            throwError(res, error)

        }
    },


    
    
    
    
    
    filtradoCategories: async (req,res) => {
        console.log(req.query)

        let productos
        try {
            if(+req.query.filter !== 0 ){
               productos = await db.Product.findAll({
                where : {
                    categoryId : req.query.filter 

                },
                    include : ['mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images']
                }) 
            }else{
                productos = await db.Product.findAll({
                    include : ['mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images']
                })
            }
            
    
            let response = {
                status : 200,
                meta : {
                    total: productos.length,
                    status:200,
                    
                },
                data: productos
                
    
        }
        return res.status(200).json(response)
        } catch (error) {
            throwError(res, error)

        }
    },


    filtradoMarks: async (req,res) => {
        console.log(req.query)

        let productos
        try {
            if(+req.query.filter !== 0){
               productos = await db.Product.findAll({
                where : {
                    markId : req.query.filter
                },
                limit: +req.query.limit,

                    include : ['mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images']
                }) 
            }else{
                productos = await db.Product.findAll({
                    limit: +req.query.limit,

                    include : ['mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images']
                })
            }
            
    
            let response = {
                status : 200,
                meta : {
                    total: productos.length,
                    status:200,
                    
                },
                data: productos
                
    
        }
        return res.status(200).json(response)
        } catch (error) {
            throwError(res, error)

        }
    },
    filtradoFrames: async (req,res) => {
        console.log(req.query)

        let productos
        try {
            if(+req.query.filter !== 0){
               productos = await db.Product.findAll({
                where : {
                    frameId : req.query.filter
                },
                    include : ['mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images']
                }) 
            }else{
                productos = await db.Product.findAll({
                    include : ['mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images']
                })
            }
            
    
            let response = {
                status : 200,
                meta : {
                    total: productos.length,
                    status:200,
                    
                },
                data: productos
                
    
        }
        return res.status(200).json(response)
        } catch (error) {
            throwError(res, error)

        }
    },
    filtradoLens: async (req,res) => {
        console.log(req.query)

        let productos
        try {
            if(+req.query.filterLens !== 0){
               productos = await db.Product.findAll({
                where : {
                   lensId : req.query.filter
                },
                    include : ['mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images']
                }) 
            }else{
                productos = await db.Product.findAll({
                    include : ['mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images']
                })
            }
            
    
            let response = {
                status : 200,
                meta : {
                    total: productos.length,
                    status:200,
                    
                },
                data: productos
                
    
        }
        return res.status(200).json(response)
        } catch (error) {
            throwError(res, error)

        }
    },
    filtradoGraduation: async (req,res) => {
        console.log(req.query)

        let productos
        try {
            if(+req.query.filterGraduation !== 0){
               productos = await db.Product.findAll({
                where : {
                    graduationId : req.query.filter
                },
                    include : ['mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images']
                }) 
            }else{
                productos = await db.Product.findAll({
                    include : ['mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images']
                })
            }
            
    
            let response = {
                status : 200,
                meta : {
                    total: productos.length,
                    status:200,
                    
                },
                data: productos
                
    
        }
        return res.status(200).json(response)
        } catch (error) {
            throwError(res, error)

        }
    },
    filtradoColor: async (req,res) => {
        console.log(req.query)

        let productos
        try {
            if(+req.query.filterColor !== 0){
               productos = await db.Product.findAll({
                where : {
                    colorId : req.query.filter
                },
                    include : ['mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images']
                }) 
            }else{
                productos = await db.Product.findAll({
                    include : ['mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images']
                })
            }
            
    
            let response = {
                status : 200,
                meta : {
                    total: productos.length,
                    status:200,
                    
                },
                data: productos
                
    
        }
        return res.status(200).json(response)
        } catch (error) {
            throwError(res, error)

        }
    },
    allProduct: async (req, res) => {
        try {
            let products = await db.Product.findAll({
                include : ['mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images']
            })

            
            let response = {
                status : 200,
                meta : {
                    total: products.length,
                    status:200,
                    
                },
                data: products,
                    
                
    
        }
            return res.status(200).json(response)

        } catch (error) {
            throwError(res, error)
        }
    },
}