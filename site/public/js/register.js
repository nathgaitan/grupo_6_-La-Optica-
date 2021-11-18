const $ = id => document.getElementById(id);

let regExLetter = /^[A-Z]+$/i;
let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/; //mayuscula, numero y 6 a 12 caracteres


document.getElementById('name').addEventListener('focus', () => {
    if(document.getElementById('name').value.trim() === ""){
        document.getElementById('name-js').innerHTML = "<span><i class='fas fa-info-circle'></i> Solo caracteres alfabéticos</span>"
    }
})

document.getElementById('name').addEventListener('blur', () => {

    switch (true) {
        case !document.getElementById('name').value.trim():
            document.getElementById('name-js').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> El nombre es obligatorio</span>"
            document.getElementById('name').classList.add('is-invalid')

            break;
        case document.getElementById('name').value.trim().length < 2 || $('name').value.trim().length > 30 :
            document.getElementById('name-js').innerText = "Entre 2 y 30 caracteres"
            document.getElementById('name').classList.add('is-invalid')

            break;
        case !regExLetter.test($('name').value.trim()):
            document.getElementById('name-js').innerText = "Solo caracteres alfabéticos"
            document.getElementById('name').classList.add('is-invalid')

            break;
        default:
            document.getElementById('name').classList.remove('is-invalid')
            document.getElementById('name').classList.add('is-valid')
            document.getElementById('name-js').innerText = null
            break;
    }
})
document.getElementById('name').addEventListener('keydown', () => {
    document.getElementById('name').classList.remove('is-invalid')
    document.getElementById('name-js').innerText = null
    })



    document.getElementById('lastName').addEventListener('focus', () => {
        if(document.getElementById('lastName').value.trim() === ""){
            document.getElementById('lastName-js').innerHTML = "<span><i class='fas fa-info-circle'></i> Solo caracteres alfabéticos</span>"
        }
    })
    
    document.getElementById('lastName').addEventListener('blur', () => {
    
        switch (true) {
            case !document.getElementById('lastName').value.trim():
                document.getElementById('lastName-js').innerHTML = "<span><i class='fas fa-exclamation-triangle'></i> El apellido es obligatorio</span>"
                document.getElementById('lastName').classList.add('is-invalid')
    
                break;
            case document.getElementById('lastName').value.trim().length < 2 || $('name').value.trim().length > 30 :
                document.getElementById('lastName-js').innerText = "Entre 2 y 30 caracteres"
                document.getElementById('lastName').classList.add('is-invalid')
    
                break;
            case !regExLetter.test($('lastName').value.trim()):
                document.getElementById('lastName-js').innerText = "Solo caracteres alfabéticos"
                document.getElementById('lastName').classList.add('is-invalid')
    
                break;
            default:
                document.getElementById('lastName').classList.remove('is-invalid')
                document.getElementById('lastName').classList.add('is-valid')
                document.getElementById('lastName-js').innerText = null
                break;
        }
    })
    document.getElementById('lastName').addEventListener('keydown', () => {
        document.getElementById('lastName').classList.remove('is-invalid')
        document.getElementById('lastName-js').innerText = null
        })




        document.getElementById('email').addEventListener('blur',() => {
            if(!regExEmail.test($('email').value)){
                document.getElementById('email-js').innerText = "Tiene que ser un email válido"
                document.getElementById('email').classList.add('is-invalid')
            }else{
                document.getElementById('email-js').innerText = null
                document.getElementById('email').classList.remove('is-invalid')
                document.getElementById('email').classList.add('is-valid')
            }
        })


        document.getElementById('password').addEventListener('blur',() => {
            if(!regExPass.test($('password').value)){
                document.getElementById('password-js').innerText = "La contraseña debe tener una mayúscula, un número y entre 6 y 12 caracteres"
                document.getElementById('password').classList.add('is-invalid')
            }else{
                document.getElementById('password-js').innerText = null
                document.getElementById('password').classList.remove('is-invalid')
                document.getElementById('password').classList.add('is-valid')
            }
        })
        document.getElementById('password').addEventListener('focus',()=> {
            document.getElementById('password').classList.remove('is-invalid')
    
        })
    
        document.getElementById('password2').addEventListener('blur',() => {
            if(document.getElementById('password').value !== $('password2').value){
                document.getElementById('password2-js').innerText = "Las contraseñas no coinciden"
                document.getElementById('password2').classList.add('is-invalid')
            }else if($('password').value == ""){
                document.getElementById('password2-js').innerText = "Debes ingresar una contraseña"
                document.getElementById('password2').classList.add('is-invalid')
            }else{
                document.getElementById('password2-js').innerText = null
                document.getElementById('password2').classList.remove('is-invalid')
                document.getElementById('password2').classList.add('is-valid')
            }
        })
        document.getElementById('password2').addEventListener('focus',()=> {
            document.getElementById('password2').classList.remove('is-invalid')
    
        })
    
        document.getElementById('terms').addEventListener('click', () => {
            document.getElementById('terms').classList.toggle('is-valid');
            document.getElementById('terms').classList.remove('is-invalid');
            document.getElementById('terms-js').innerHTML = null
    
        })

        document.getElementById('form-register').addEventListener('submit', e =>{
            e.preventDefault();

            let elementForm = $('form-register').elements;


            let errors = false
            for (let i = 0; i < elementForm.length - 1; i++) {

                if(!elementForm[i].value){
                    elementForm[i].classList.add('is-invalid')
                    document.getElementById('campo-vacio').innerHTML = "Debes completar todos los campos";
                    errors = true
                }
            }

            if(!document.getElementById('terms').checked) {
            
                document.getElementById('terms').classList.add('is-invalid')
                document.getElementById('terms-js').innerText = "Debes aceptar los términos y condiciones";
                errors = true
            }

            for (let i = 0; i < elementForm.length - 1; i++) {
            
                if(elementForm[i].classList.contains('is-invalid')){
                    errors = true
                }
            }

            if(!errors){
                document.getElementById('form-register').submit()
            }
        



        })

        