const $ = id => document.getElementById(id);

const qs = q => document.querySelector(q);

// Epresiones regulares 
let regExEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/; // es email

// paraguas de login
const bodyLogin = qs('body.login');

if (bodyLogin) {

    window.addEventListener('load', () => {

        console.log('loginValidations.js vinculado correctamente!');
        /* variables */
        const emailLetterLength = d => ($(d).value.trim().length >= 13 && $(d).value.trim().length <= 80);
        const testRegExEmail = d => regExEmail.test($(d).value.trim());
        const passLetterLength = d => ($(d).value.trim().length >= 6 && $(d).value.trim().length <= 20);
        const elementForm = $('form-login').elements;

        if($('error-msg').textContent !== '') {
            $('error').style.display = "block";
        }

        $('email').focus;
        
        $('email').addEventListener('focus', function () {
            

            this.classList.remove('is-invalid')
            $('email-msg').classList.add('info-input')
            $('email-msg').innerText = "Ingresa tu email completo"
            $('email-msg').classList.remove('error-input')

            if (testRegExEmail('email') && emailLetterLength('email')) {
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
            }
        })

        $('email').addEventListener('blur', function () {
            

            if (!(testRegExEmail('email'))) {

                this.classList.remove('is-valid')
                this.classList.add('is-invalid')
                $('email-msg').classList.remove('info-input')
                $('email-msg').classList.add('error-input')
                $('email-msg').innerText = "Debe ser un email válido"

            } else
            if (!emailLetterLength('email')) {

                this.classList.remove('is-valid')
                this.classList.add('is-invalid')
                $('email-msg').classList.remove('info-input')
                $('email-msg').classList.add('error-input')
                $('email-msg').innerText = "Debe ser un email válido de 13 a 80 caracteres"

            } else
            if (testRegExEmail('email') && emailLetterLength('email')) {
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                $('email-msg').classList.remove('info-input')
                $('email-msg').classList.remove('error-input')
                $('email-msg').innerText = null
            }
        })

        
        $('email').addEventListener('keydown', function () {
            
            
            if (testRegExEmail('email') && emailLetterLength('email')) {
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
            }

            if(!(testRegExEmail('email')) || !(emailLetterLength('email'))) {
                this.classList.remove('is-valid')
                this.classList.add('is-invalid')
            }
        })

        $('password').addEventListener('focus', function () {
            

            this.classList.remove('is-invalid')
            $('password-msg').classList.add('info-input')
            $('password-msg').innerText = "Ingresa tu contraseña"
            $('password-msg').classList.remove('error-input')

            if (passLetterLength('password')) {
                this.classList.add('is-valid')
            }
        })

        $('password').addEventListener('blur', function () {
            
        
            if (!passLetterLength('password')) {
                this.classList.remove('is-valid')
                this.classList.add('is-invalid')
                $('password-msg').classList.remove('info-input')
                $('password-msg').classList.add('error-input')
                $('password-msg').innerText = "Debe ser un contraseña de 6 a 20 caracteres"

            } else {
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                $('password-msg').classList.remove('info-input')
                $('password-msg').classList.remove('error-input')
                $('password-msg').innerText = null
            }
        })

        
        $('password').addEventListener('keydown', function (e) {
            const key = e.key;

            

            if (passLetterLength('password')) {
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
            }

            if (!passLetterLength('password')) {
                this.classList.remove('is-valid')
                this.classList.add('is-invalid')
            }

        })

        $('password').addEventListener('keypress', function () {
           
            if (passLetterLength('password')) {
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
            }
            if (!passLetterLength('password')) {
                this.classList.remove('is-valid')
                this.classList.add('is-invalid')
            }
        })

        $('form-login').addEventListener('submit', function (e) {
            

            e.preventDefault();

            let errors = [
                {
                    type: 'email',
                    msg: ''
                },
                {
                    type: "password",
                    msg: ''
                }
            ];

            for (let i = 0; i < elementForm.length - 2; i++) {
                let forIsElementFormPass = elementForm[i].id === 'password';
                let forIsElementFormEmail = elementForm[i].id === 'email';

                if (forIsElementFormPass && !passLetterLength('password')) {
                    elementForm[i].classList.add('is-invalid')
                    errors.filter(error => {
                        if (forIsElementFormPass && error.type === 'password') {
                            error.msg = 'De 6 a 20 caracteres obligatorio';
                        }
                    })
                
                } 
                if (forIsElementFormEmail && !emailLetterLength('email')) {
                    elementForm[i].classList.add('is-invalid')
                    errors.filter(error => {
                        if (forIsElementFormEmail && error.type === 'email') {
                            error.msg = 'De 13 a 80 caracteres obligatorio';
                        }
                    })
                } 
                if (forIsElementFormEmail && !testRegExEmail('email')) {
                    elementForm[i].classList.add('is-invalid')
                    errors.filter(error => {
                        if (forIsElementFormEmail && error.type === 'email') {
                            error.msg = 'Debe ser un email válido';
                        }
                    })
                } 

            }

            if (errors[0].msg !== '' || errors[1].msg !== '') {
                $('error').style.display = "block"
                $('error-msg').innerHTML = `Debes completar los campos señalados:`
                for (let i = 0; i < elementForm.length - 2; i++) {
                    
                    if (elementForm[i].classList.contains('is-invalid')) {
                        let forIsElementFormPass = elementForm[i].id === 'password';
                        let forIsElementFormEmail = elementForm[i].id === 'email';

                        if (forIsElementFormEmail && errors[0].msg.length !== 0) {
                            console.log(forIsElementFormEmail && errors[0].msg.length !== 0)
                            $('error-msg').innerHTML += `<br>- <b>${elementForm[i].id}</b>: ${errors[0].msg}`
                        }

                        if (forIsElementFormPass && errors[1].msg.length !== 0) {
                            $('error-msg').innerHTML += `<br>- <b>${elementForm[i].id}</b>: ${errors[1].msg}`
                        }
                    }
                }
            } else if (errors[0].msg === '' && errors[1].msg === '') {
                for (let i = 0; i < elementForm.length - 1; i++) {
                    elementForm[i].classList.remove('is-invalid')
                    elementForm[i].classList.add('is-valid')
                }
                $('error').style.display = 'none';
                $('error-msg').innerHTML = null;
                
                $('form-login').submit()
                
            }

        })
    })
}