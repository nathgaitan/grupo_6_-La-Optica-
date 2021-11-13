const getURL = req => `${req.protocol}://${req.get('host')}${req.originalUrl}`;
const db = require('../../database/models');

const productVerify = (cart,id) => {
    let index = -1;
   
    for (let i = 0; i < cart.length; i++) {
        
        if(cart[i].id === +id){
            index = i
            break
        }
    }
    return index
}

module.exports = {
    // ruta=> /apis/cart/get-cart
    getcart: (req, res) => {
        let response = {
            status: 200,
            meta: {
                link: getURL(req)
            },
            data: req.session.cart
        }
        return res.status(200).json(response)

    },
    // ruta=> /apis/cart/add/:id
    add: async (req, res) => {
        try {
            let cartLength = req.session.cart.length;

            let product = await db.Product.findByPk(req.params.id, {
                include: [
                    'mark', 'color', 'lens', 'frame', 'graduation', 'category', 'images'
                ]
            })
            // item contendra = id, name, image, quantity, mark, price,discount, color, detail, code, lens, frame, category, graduation,subtotal
            let item = {
                id: +product.id,
                name: product.name,
                image : product.images[0].file,
                quantity: 1,
                mark: product.mark.name,
                price: +product.price,
                discount: +product.discount,
                color: product.color.name,
                detail: product.detail,
                code: product.code,
                lens: product.lens.name,
                frame: product.frame.name,
                category: product.category.name,
                graduation: product.graduation.name,
                subtotal: +product.price
            }

            if (cartLength === 0) {
                let order = await db.Order.findOne({
                    where: {
                        userId: req.session.userLogin.id,
                        status: 'pending'
                    }
                })

                if (!order) {
                    order = await db.Order.create({
                        userId: req.session.userLogin.id,
                        status: 'pending'
                    })
                }

                item = {
                    ...item,
                    orderId: order.id
                }

                req.session.cart.push(item)

                await db.Cart.create({
                    userId: req.session.userLogin.id,
                    productId: item.id,
                    orderId : item.orderId,
                    cantidad : 1,
                })

            } else {
                let index = productVerify(req.session.cart,req.params.id);
                let order = await db.Order.findOne({
                    where: {
                        userId: req.session.userLogin.id,
                        status: 'pending'
                    }
                })
                
                if (index === -1) {
                    item = {
                        ...item,
                        orderId: order.id
                    }
                    req.session.cart.push(item)

                    await db.Cart.create({
                        userId: req.session.userLogin.id,
                        productId: item.id,
                        orderId : item.orderId,
                        cantidad : 1,
                    })

                } else {
                    let product = req.session.cart[index]

                    product.quantity++
                    product.subtotal = product.quantity * product.price

                    req.session.cart[index] = product

                    await db.Cart.update(
                        {
                            cantidad : product.quantity
                        },
                        {
                          where : {
                              orderId : product.orderId,
                              productId : product.id
                          }  
                        }
                    )
                }
            }

            let response = {
                status: 200,
                meta: {
                    link: '/apis/cart/add/' + req.params.id,
                },
                data: req.session.cart
            }
            return res.status(200).json(response)

        } catch (error) {
            console.log(error)
        }
    },
    // ruta=> /apis/cart/delete/:id
    remove : async (req,res) => {
        try {
            let index = productVerify(req.session.cart, req.params.id)
            
            let product = req.session.cart[index]

            if(product.quantity > 1) {

                product.quantity--
                product.subtotal = product.quantity * product.price

                req.session.cart[index] = product;

                await db.Cart.update(
                    {
                        quantity : product.quantity
                    },
                    {
                      where : {
                          orderId : product.orderId,
                          productId : product.id
                      }  
                    }
                )

            } else {
                req.session.cart.splice(index,1);

                await db.Cart.destroy({
                    where : {
                        orderId : product.orderId,
                        productId : product.id
                    }  
                })
            }

            let response = {
                meta : {
                    link : getURL(req)
                },
                data : req.session.cart
            }
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    },
    // ruta=> /apis/cart/delete-product/:id
    removeProduct: async (req, res) => {
        try {
            let index = productVerify(req.session.cart,req.params.id);
            
            let product = req.session.cart[index]

            if(req.session.cart.length > 1) {

                req.session.cart.splice(index,1);

                await db.Cart.destroy({
                    where : {
                        orderId : product.orderId,
                        productId : product.id
                    }  
                })

            } else if (req.session.cart.length === 1) {

                req.session.cart.splice(index,1);
                
                await db.Cart.destroy({
                    where : {
                        orderId : product.orderId,
                        productId : product.id
                    }  
                })

                await db.Order.destroy({
                    where : {
                        userId : req.session.userLogin.id,
                        status : 'pending'
                    },
                })
            }


            let response = {
                meta : {
                    link : getURL(req)
                },
                data : req.session.cart
            }
            return res.status(200).json(response)

        } catch (error) {

            console.log(error)
            return res.status(500).json(error)
        }
        
    },
    // ruta=> /apis/cart/empty
    empty : async (req,res) => {
        try {
            await db.Order.destroy({
                where : {
                    userId : req.session.userLogin.id,
                    status : 'pending'
                },
            })
            req.session.cart = [];

            let response = {
                meta : {
                    link : getURL(req)
                },
                data : req.session.cart
            }

            return res.status(200).json(response)

        } catch (error) {

            console.log(error)
            return res.status(500).json(error)
        }
    }
}