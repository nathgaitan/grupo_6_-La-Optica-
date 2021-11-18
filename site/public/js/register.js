const $ = id => document.getElementById(id);

let regExLetter = /^[A-Z]+$/i;
let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/; //mayuscula, numero y 6 a 12 caracteres


$('name').addEventListener('focus', () => {
    if($('name').value.trim() === ""){
        $('name-js').innerHTML = "<span><i class='fas fa-info-circle'></i> Solo caracteres alfabéticos</span>"
    }
})

$('name').addEventListener('blur', () => {

    switch (true) {
        case !$('name').value.trim():
            $('name-js').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> El nombre es obligatorio</span>"
            $('name').classList.add('is-invalid')

            break;
        case $('name').value.trim().length < 2 || $('name').value.trim().length > 30 :
            $('name-js').innerText = "Entre 2 y 30 caracteres"
            $('name').classList.add('is-invalid')

            break;
        case !regExLetter.test($('name').value.trim()):
            $('name-js').innerText = "Solo caracteres alfabéticos"
            $('name').classList.add('is-invalid')

            break;
        default:
            $('name').classList.remove('is-invalid')
            $('name').classList.add('is-valid')
            $('name-js').innerText = null
            break;
    }
})
$('name').addEventListener('keydown', () => {
    $('name').classList.remove('is-invalid')
    $('name-js').innerText = null
    })



    $('lastName').addEventListener('focus', () => {
        if($('lastName').value.trim() === ""){
            $('lastName-js').innerHTML = "<span><i class='fas fa-info-circle'></i> Solo caracteres alfabéticos</span>"
        }
    })
    
    $('lastName').addEventListener('blur', () => {
    
        switch (true) {
            case !$('lastName').value.trim():
                $('lastName-js').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> El apellido es obligatorio</span>"
                $('lastName').classList.add('is-invalid')
    
                break;
            case $('lastName').value.trim().length < 2 || $('name').value.trim().length > 30 :
                $('lastName-js').innerText = "Entre 2 y 30 caracteres"
                $('lastName').classList.add('is-invalid')
    
                break;
            case !regExLetter.test($('lastName').value.trim()):
                $('lastName-js').innerText = "Solo caracteres alfabéticos"
                $('lastName').classList.add('is-invalid')
    
                break;
            default:
                $('lastName').classList.remove('is-invalid')
                $('lastName').classList.add('is-valid')
                $('lastName-js').innerText = null
                break;
        }
    })
    $('lastName').addEventListener('keydown', () => {
        $('lastName').classList.remove('is-invalid')
        $('lastName-js').innerText = null
        })




        $('email').addEventListener('blur',() => {
            if(!regExEmail.test($('email').value)){
                $('email-js').innerText = "Tiene que ser un email válido"
                $('email').classList.add('is-invalid')
            }else{
                $('email-js').innerText = null
                $('email').classList.remove('is-invalid')
                $('email').classList.add('is-valid')
            }
        })


        $('password').addEventListener('blur',() => {
            if(!regExPass.test($('password').value)){
                $('password-js').innerText = "La contraseña debe tener una mayúscula, un número y entre 6 y 12 caracteres"
                $('password').classList.add('is-invalid')
            }else{
                $('password-js').innerText = null
                $('password').classList.remove('is-invalid')
                $('password').classList.add('is-valid')
            }
        })
        $('password').addEventListener('focus',()=> {
            $('password').classList.remove('is-invalid')
    
        })
    
        $('password2').addEventListener('blur',() => {
            if($('password').value !== $('password2').value){
                $('password2-js').innerText = "Las contraseñas no coinciden"
                $('password2').classList.add('is-invalid')
            }else if($('password').value == ""){
                $('password2-js').innerText = "Debes ingresar una contraseña"
                $('password2').classList.add('is-invalid')
            }else{
                $('password2-js').innerText = null
                $('password2').classList.remove('is-invalid')
                $('password2').classList.add('is-valid')
            }
        })
        $('password2').addEventListener('focus',()=> {
            $('password2').classList.remove('is-invalid')
    
        })
    
        $('terms').addEventListener('click', () => {
            $('terms').classList.toggle('is-valid');
            $('terms').classList.remove('is-invalid');
            $('terms-js').innerHTML = null
    
        })

        $('form-register').addEventListener('submit', e =>{
            e.preventDefault();

            let elementForm = $('form-register').elements;


            let errors = false
            for (let i = 0; i < elementForm.length - 1; i++) {

                if(!elementForm[i].value){
                    elementForm[i].classList.add('is-invalid')
                    $('campo-vacio').innerHTML = "Debes completar todos los campos";
                    errors = true
                }
            }

            if(!$('terms').checked) {
            
                $('terms').classList.add('is-invalid')
                $('terms-js').innerText = "Debes aceptar los términos y condiciones";
                errors = true
            }

            for (let i = 0; i < elementForm.length - 1; i++) {
            
                if(elementForm[i].classList.contains('is-invalid')){
                    errors = true
                }
            }

            if(!errors){
                $('form-register').submit()
            }
        



        })

        