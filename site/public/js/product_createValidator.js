console.log('product_createValidator.js success');


$('name').addEventListener('keypress', () => {
    switch (true) {
           case $('name').value.length < 5:
               $('name').classList.add('is-invalid')
               $('error-name').innerText = "El nombre debe tener un mínimo de 5 caracteres";
               $('name').classList.remove('is-valid');
   
               break
           default:
               $('name').classList.remove('is-invalid');
               $('name').classList.add('is-valid');
               $('error-name').innerText = "";
       }
   
   });

   $('code').addEventListener('keypress', () => {
    switch (true) {
           case $('code').value.length < 4:
               $('code').classList.add('is-invalid')
               $('error-code').innerText = "El nombre debe tener un mínimo de 4 numeros";
               $('code').classList.remove('is-valid');
   
               break
           default:
               $('code').classList.remove('is-invalid');
               $('code').classList.add('is-valid');
               $('error-code').innerText = "";
       }
   
   });


$('detail').addEventListener('keypress', () => {
    switch (true) {
        case $('detail').value.length < 20:
            $('detail').classList.add('is-invalid')
            $('error-detail').innerText = "El detalle debe tener un mínimo de 20 caracteres";
            $('detail').classList.remove('is-valid');

            break
        default:
            $('detail').classList.remove('is-invalid');
            $('detail').classList.add('is-valid');
            $('error-detail').innerText = "";
    }

})

$('price').addEventListener('keypress', () => {
    switch (true) {
           case $('price').value.length < 4:
               $('price').classList.add('is-invalid')
               $('error-price').innerText = "El nombre debe tener un mínimo de 4 numeros";
               $('price').classList.remove('is-valid');
   
               break
           default:
               $('price').classList.remove('is-invalid');
               $('price').classList.add('is-valid');
               $('error-price').innerText = "";
       }
   
   });




