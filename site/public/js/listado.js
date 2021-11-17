console.log('conectado')
const tothousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const priceFinal  = (a,b) => a - (a*b/100);

const qsa = q => document.querySelectorAll(q);


window.addEventListener('load', () => {


    let filterCategory = $('category-filter')
    let filterMark = $('mark-filter')
    let filterFrame = $('frame-filter')
    let filterLens = $('lens-filter')
    let filterGraduation = $('graduation-filter')
    let filterColor = $('color-filter')
    let limit = $('select-limit')
    let order = $('select-filtro')
    


    const allProductos = async () =>{
        let response = await fetch(window.origin + `/apis/products/product`)
        let products = await response.json()
    
        products.data.forEach(product => {
            addItem(product)
        });
    }

    allProductos()


        

    const filtradoProducts = async (filterMark,limit,order="id") =>{
         try {
            let response = await fetch(window.origin + `/apis/products/mark-filter?filter=${filterMark }&limit=${limit }&order=${order}`)

            let products = await response.json()
            listado.innerHTML = null
        
            products.data.forEach(product => {
                addItem(product)
            })
    
        
         } catch (error) {
             console.log(error)
         }
        }

        

    filtradoProducts(0,6)
    

    

    
    


    const addItem = product => {
        let item = `
        <article>
            <a href="/products/detalle-de-producto/${product.id}">
                <figure class="anteojos">
                    <img class="img-anteojos" src="/images/products/${product.images[0].file}"
                    alt=" ${product.name}, ${product.mark.name} ">
                </figure>

            <div class="box-detalle">
                <p class="title">
                         ${product.name} 
                </p> 
                 if ${(product.discount> 0) }
                    <p class="discount">
                         ${tothousand(product.price)}
                    </p>
                    <p class="price">
                         ${tothousand(priceFinal(product.price,product.discount).toFixed(0))}
                    </p>
                 else
                    <p class="discount"></p>
                    <p class="price">
                         ${tothousand(product.price)} 
                    </p>
               
            </div>
            </a>
            <div class="check-like">
                <input type="checkbox" id=" ${product.id} ">
                <label for=" ${product.id}"><i class="far fa-heart"></i></label>
                <div class="check-buy">
                    <input type="checkbox" class="buy" id="buy ${product.id} ">
                    <label for="buy ${product.id} "><i class="fas fa-shopping-basket"></i></label>
                    <label class="plus" for="buy"><i class="fas fa-plus"></i></label>
                </div>
            </div>
        </article>
        `
        listado.innerHTML += item;
    }

   filterMark.addEventListener('change',e =>{
        filtradoProducts(e.target.value,limit.value,order.value)
    })
/* 
    filterColor.addEventListener('change',e =>{
        filtradoProducts(filterMark.value,e.target.value,limit.value)
    })
    
    filterFrame.addEventListener('change',e =>{
        filtradoProducts(e.target ? e.target.value : 1)
    })

    filterCategory.addEventListener('change',e =>{
        filtradoProducts(e.target ? e.target.value : 1)
    })

    filterLens.addEventListener('change',e =>{
        filtradoProducts( e.target.value )
    })

    filterGraduation.addEventListener('change',e =>{
        filtradoProducts(e.target ? e.target.value : 1)
    })

    */

    

    limit.addEventListener('change',e =>{
        filtradoProducts(filterMark.value,e.target.value,order.value)
    })

    order.addEventListener('change', e => {
        if(e.target.value === 'namedes'){
            filtradoProducts(filterMark.value,limit.value,order.name).sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name)? -1 :0)
        }else if(order.value === 'pricedes'){
            filtradoProducts(filterMark.value,limit.value,order.price).sort((a, b) => (a.price < b.price) ? 1 : (a.price > b.price)? -1 :0)
        }else if(order.value === 'markIddes'){
            filtradoProducts(filterMark.value,limit.value,order.markId).sort((a, b) => (a.markId < b.markId) ? 1 : (a.markId > b.markId)? -1 :0)
        }else{
            filtradoProducts(filterMark.value,limit.value,e.target.value)
        }
    })

    /*order.addEventListener('change',() =>{
        switch (order.value) {
            case 'name':
                let anteojos = filtradoProducts()
                anteojos.sort((a, b) => (a.name > b.name) ? 1 : (a.name < b.name)? -1 :0)
                break;
        
            default:
                break;
        }
    }
    */
})

        



