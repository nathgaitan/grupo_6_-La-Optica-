const fs = require('fs');
const path = require('path');
const products = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','products.json'),'utf-8'));


module.exports = {
    detail: (req,res)=>{
        const product = products.find(product => product.id ===+req.params.id)
        res.render("productDetail",{
            products,
            product,
        })
    },
    
}