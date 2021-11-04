console.log('product_createValidator.js success');

let detail = $('detail');

window.addEventListener('keypress', () => {
    switch (true) {
        case detail.value.length < 10:
            detail.classList.add('is-invalid')
            $('error-detail').innerText = "El detalle debe tener un mínimo de 10 caracteres";
            detail.classList.remove('is-valid');

            break
        default:
            detail.classList.remove('is-invalid');
            detail.classList.add('is-valid');
            $('error-detail').innerText = "";
    }

})