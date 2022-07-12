console.log('cart.js conectado exitosamente!')

// estructura del carrito
const cartContainer = $('cart-container');
const asideContainer = $('buy-container');
const cuerpo = $('cuerpo');
const lentes = $('lentes');
const lentesDeSol = $('lentes-de-sol');
const bodyCart = $('body-cart');
const sugerencias = $('sugerencias');
const fondoDifuminado = qs('.bc-gray') // fondo interactivo que focaliza la atencion en el carrito

// datos 
const image = $('background-image');
const name = $('name');
const description = $('descripcion');
const totalPrice = $('total');
const color = $('color');
const price = $('price');
const cantidadItem = $('cantidad-item');
const codePromo = $('codigo-prom');
const c = $('quantityCart');

// btn interactivos
const finalizarCompra = $('buy-box'); // finaliza la compra
const beforeItem = $('before-item'); // disminuye la cantidad del producto
const nextItem = $('next-item'); // aumenta la cantidad del producto
const vaciarCart = $('vaciar'); // vacia el carrito de compras
const eliminarItem = $('eliminar-item'); // elimina el producto seleccionado del carrito
const btnCart = $('btn-cart'); // botón de barra de navegación

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


// vista home / listar productos


/* btnCart.addEventListener('click', () => {
    fondoDifuminado.style.display = 'block';
    cartContainer.style.display = 'block';
})
fondoDifuminado.addEventListener('click', function() {
    this.style.display = 'none';
    cartContainer.style.display = 'none';
}) */


const itemEnCart = (carrito) => {
    const q = 0;
    const total = 0;

    if (carrito) {
        carrito.forEach(item => {
            q += +item.quantity;
            total += +item.subtotal
        })
    }

    if (qs('body.cart')) {
        totalPrice.innerHTML = `$${toThousand(total)}`;
    }
    quantityCart.innerHTML = q;

    if (q === 0) {
        bodyCart.style.display = "none";
        sugerencias.style.display = "flex";
        finalizarCompra.setAttribute('disabled', "true");
        vaciarCart.setAttribute('disabled', "true");

    } else {
        bodyCart.style.display = "flex";
        sugerencias.style.display = "none";
        finalizarCompra.removeAttribute('disabled');
        vaciarCart.removeAttribute('disabled');

    }

}

const cargarItems = carrito => {
    bodyCart.innerHTML = null;

    carrito.forEach(product => {
        let item = `
            <article id="item-cart" class="bc-white">
                <section id="article-info" class="d-flex">
                    <div id="background-image" style="background-image: url('/images/products/${product.image}');"></div>
                    <article id="name-desc-color" class="d-flex">
                        <p id="name">${product.name}</p>
                        <p id="descripcion" class="c-gray">${product.detail.substr(0, 33)}...</p>
                        <div id="color-select">
                            <span id="span-color" class="c-gray p-10-20">Color</span>
                            <select name="color" id="color" class="d-flex">
                                <option value="${product.colorId}">${product.color}</option>
                            </select>
                        </div>
                    </article>
                </section>
                <section id="quantity-price" class="d-flex">
                    <div id="quantity" class="text-center">
                        <p class="c-gray">Cantidad</p>
                        <div class="text-center quantity-box">
                            <a id="before-item" onClick="removeItem(event,${product.id})"> - </a>
                            <span id="cantidad-item" class="c-number span-cant">${product.quantity}</span>
                            <a id="next-item" onClick="addItem(event,${product.id})"> + </a>
                        </div>
                    </div>
                    <div id="subtotal" class="text-center">
                        <p class="c-gray">Subtotal</p>
                        <div>
                            <span id="price" class="c-number">$${toThousand(product.subtotal)}</span>
                        </div>
                    </div>
                </section>
                <div id="eliminar-item">
                    <i class="fa fa-trash trash-item" onclick="removeProduct(event,'${product.id}')" aria-hidden="true"></i>
                </div>
            </article>
            `;

        bodyCart.innerHTML += item
        
    })

    return false
}
const getCart = async () => {
    try {
        let response = await fetch(window.origin + '/apis/cart/get-cart')
        let result = await response.json()

        if (qs('body.cart')) {
            cargarItems(result.data)
        }
        itemEnCart(result.data)

    } catch (error) {
        console.log(error)
    }
}
const addItem = async (e, id) => {
    /* e.preventDefault() */

    try {
        let response = await fetch('/apis/cart/add/' + id)
        let result = await response.json()

        if (qs('body.cart')) {
            cargarItems(result.data)
        }

        itemEnCart(result.data)

    } catch (error) {
        console.log(error)
    }
}

const removeItem = async (e, id) => {
    e.preventDefault()

    try {
        let response = await fetch('/apis/cart/delete/' + id)
        let result = await response.json()

        if (qs('body.cart')) {
            cargarItems(result.data)
        }
        itemEnCart(result.data)

    } catch (error) {
        console.log(error)
    }
}

const removeProduct = async function (e, id) {
    /* e.preventDefault() */

    try {
        let response = await fetch('/apis/cart/delete-product/' + id)
        let result = await response.json()

        if (qs('body.cart')) {
            cargarItems(result.data)
        }

        itemEnCart(result.data);

    } catch (error) {
        console.log(error)
    }
}

const remove = async (e, id) => {
    e.preventDefault()

    try {
        let response = await fetch('/apis/cart/delete/' + id)
        let result = await response.json()

        cargarItems(result.data)
        itemEnCart(result.data)

    } catch (error) {
        console.log(error)
    }
}

const emptyCart = async () => {
    try {
        let response = await fetch('/apis/cart/empty')
        let result = await response.json()

        bodyCart.innerHTML = null
        itemEnCart(result.data)

    } catch (error) {

        console.log(error)
    }
}

getCart()
