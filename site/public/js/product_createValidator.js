if (qs('body.forms')) {
    console.log('product_createValidator.js success');

    const regExExt = /(.jpg|.png|.webp)$/i;


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
                $('error-code').innerText = "El codigo debe tener un mínimo de caracteres";
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
    })

    $('image').addEventListener('change', function (e) {
        switch (true) {
            case !regExExt.exec(this.value):
                imagenError.innerHTML = "Solo imágenes con extensión jpg, png, webp"
                this.classList.add('is-invalid');
                $('preview').innerHTML = null
                break;
            case this.files.length > 3:
                imagenError.innerHTML = "Solo se permiten 3 imágenes"
                this.classList.add('is-invalid');
                $('preview').innerHTML = null
                break
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                imagenError.innerHTML = null;
                btnImages.innerText = "Cambiar imágenes"

                if (this.files) {
                    [].forEach.call(this.files, readAndPreview)
                }

                function readAndPreview(file) {
                    var reader = new FileReader();
                    $('preview').innerHTML = null;
                    reader.addEventListener('load', function () {
                        var image = new Image()
                        image.height = 100;
                        image.title = file.name;
                        image.src = this.result;
                        $('preview').appendChild(image)
                    })
                    reader.readAsDataURL(file)
                }


                break;
        }      
    

    })

    $('imageEdit').addEventListener('change', function (e) {
        switch (true) {
            case !regExExt.exec(this.value):
                imagenErrorEdit.innerHTML = "Solo imágenes con extensión jpg, png, webp"
                this.classList.add('is-invalid');
                $('preview').innerHTML = null
                break;
            case this.files.length > 3:
                imagenErrorEdit.innerHTML = "Solo se permiten 3 imágenes"
                this.classList.add('is-invalid');
                $('preview').innerHTML = null
                break
            default:
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
                imagenErrorEdit.innerHTML = null;
                btnImages.innerText = "Cambiar imágenes"

                break;
        }      
    

    })


     $('form-create').addEventListener('submit', event => {
      event.preventDefault();

      let elementsForm = $('form-create').elements;
   
      let error = false;

      for (let i = 0; i < elementsForm.length - 1; i++) {
          
          if(!elementsForm[i].value){
              elementsForm[i].classList.add('is-invalid');
              $('error-empty').innerHTML = "Los campos señalados son obligatorios";
              error = true
          }
      }    

      if(!error){
          $('form-create').submit()
       
      }
  })

}
