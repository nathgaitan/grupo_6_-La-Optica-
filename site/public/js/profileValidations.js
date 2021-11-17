if (qs('body.profile')) {

    $('navegacion').addEventListener('click', () => {
        qs('.oculto').classList.toggle('mostrar')
        $('menu').classList.toggle('d-none')
        $('quitar').classList.toggle('d-none')
    });

    if (window.outerWidth >= 768) {
        qs('.brother1').classList.add('w-50porc');
        qs('.brother2').classList.add('w-50porc');
        qs('.brother3').classList.add('w-50porc');
        qs('.brother4').classList.add('w-50porc');
        qs('.brother5').classList.add('w-50porc');
    }

    window.addEventListener('load', async () => {
        console.log('profileValidations.js success!');
        // formulario
        const formProfile = $('form-profile');
        // inputs
        const avatar = $('avatar_user');
        const name = $('name');
        const lastName = $('lastName');
        const pass = $('password'); // cambiar la contraseña es opcional, a menos de que escriba algo en este campo no va a recibit una alerta
        const pass2 = $('confirmpassword');
        const oldPassword = $('oldpassword');

        // informar campos que se completaron mal
        const error = $('error')
        const errorMsg = $('error-msg');
        const quit = $('quit');

        // small donde dar info o alarma en tiempo real
        const avatarMsg = $('avatar-msg');
        const nameMsg = $('name-msg');
        const lastNameMsg = $('lastName-msg');
        const passMsg = $('pass-msg');
        const pass2Msg = $('pass2-msg');

        // contraseña para confirmar cambios
        const passConfirmMsg = $('passConfirm-msg');

        // variables
        const nameLetterLength = d => ($(d).value.trim().length >= 3 && $(d).value.trim().length <= 50);
        const passLetterLength = d => ($(d).value.trim().length >= 6 && $(d).value.trim().length <= 20);
        const elementForm = $('form-profile').elements;

        // expresiones regulares
        const regExExt = /(.jpg|.jpeg|.png|.gif|.webp)$/i;

        const parrafoFuncion = (p) => p.textContent !== '' ? p.style.display = 'block' : p.style.display = 'none';
        
        parrafoFuncion(avatarMsg)
        parrafoFuncion(nameMsg)
        parrafoFuncion(lastNameMsg)
        parrafoFuncion(passMsg)
        parrafoFuncion(pass2Msg)
        parrafoFuncion(passConfirmMsg)

        quit.addEventListener('click', () => {
            error.style.display = "none";
            errorMsg.innerText = null;
        })

        name.focus;
        // avatar validation 
        avatar.addEventListener('change', function () {
            if (!regExExt.exec(this.value)){
                $('btn-avatar').classList.remove('is-valid')
                $('btn-avatar').classList.add('btn-invalid')
                avatarMsg.classList.remove('info-input')
                avatarMsg.classList.add('error-input')
                avatarMsg.innerText = "Sólo se permiten imágenes de extensión jpg,jpeg,pgn,gif,webp"
            } else {
                $('btn-avatar').classList.remove('btn-invalid')
                $('btn-avatar').classList.add('is-valid')
                $('btn-avatar').innerText = 'Cambiar imagen'
                avatarMsg.classList.remove('error-input')
                avatarMsg.classList.remove('info-input')
                avatarMsg.innerText = null
            }
            parrafoFuncion(avatarMsg)
    
        })

        // name validation
        name.addEventListener('focus', function () {

            this.classList.remove('is-invalid')
            nameMsg.classList.add('info-input')
            nameMsg.innerText = "Ingresa su nombre completo"
            nameMsg.classList.remove('error-input')

            if (nameLetterLength('name')) {
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                nameMsg.classList.remove('info-input')
                nameMsg.innerText = null
            }
            parrafoFuncion(nameMsg)

        })

        name.addEventListener('blur', function () {

            if (this.value.length === 0) {
                this.classList.remove('is-valid')
                this.classList.add('is-invalid')
                nameMsg.classList.remove('info-input')
                nameMsg.classList.add('error-input')
                nameMsg.innerText = "El nombre es obligatorio"
            }

            else if (!nameLetterLength('name')) {

                this.classList.remove('is-valid')
                this.classList.add('is-invalid')
                nameMsg.classList.remove('info-input')
                nameMsg.classList.add('error-input')
                nameMsg.innerText = "Debe ser un nombre de 3 a 50 caracteres"

            }
            else if (nameLetterLength('name')) {
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                nameMsg.classList.remove('info-input')
                nameMsg.classList.remove('error-input')
                nameMsg.innerText = null
            }
            parrafoFuncion(nameMsg)

        })

        name.addEventListener('keydown', function () {

            if (nameLetterLength('name')) {
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                nameMsg.classList.remove('info-input')
                nameMsg.classList.remove('error-input')
                nameMsg.innerText = null
            }

            if (!(nameLetterLength('name'))) {
                this.classList.remove('is-valid')
                this.classList.add('is-invalid')
                nameMsg.classList.add('info-input')
                nameMsg.innerText = "Debe ser un nombre de 3 a 50 caracteres"
            }
            parrafoFuncion(nameMsg)
        })

        // lastName validation
        lastName.addEventListener('focus', function () {

            this.classList.remove('is-invalid')
            lastNameMsg.classList.add('info-input')
            lastNameMsg.innerText = "Ingresa su apellido completo"
            lastNameMsg.classList.remove('error-input')

            if (nameLetterLength('lastName')) {
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                lastNameMsg.classList.remove('info-input')
                lastNameMsg.innerText = null

            }
            parrafoFuncion(lastNameMsg)
        })

        lastName.addEventListener('blur', function () {

            if (this.value.length === 0) {
                this.classList.remove('is-valid')
                this.classList.add('is-invalid')
                lastNameMsg.classList.remove('info-input')
                lastNameMsg.classList.add('error-input')
                lastNameMsg.innerText = "El apellido es obligatorio"
            }

            else if (!nameLetterLength('lastName')) {

                this.classList.remove('is-valid')
                this.classList.add('is-invalid')
                lastNameMsg.classList.remove('info-input')
                lastNameMsg.classList.add('error-input')
                lastNameMsg.innerText = "Debe ser un apellido de 3 a 50 caracteres"

            }
            else if (nameLetterLength('lastName')) {
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                lastNameMsg.classList.remove('info-input')
                lastNameMsg.classList.remove('error-input')
                lastNameMsg.innerText = null
            }
            parrafoFuncion(lastNameMsg)
        })

        lastName.addEventListener('keydown', function () {

            if (nameLetterLength('lastName')) {
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                lastNameMsg.classList.remove('info-input')
                lastNameMsg.classList.remove('error-input')
                lastNameMsg.innerText = null
            }

            if (!(nameLetterLength('lastName'))) {
                this.classList.remove('is-valid')
                this.classList.add('is-invalid')
                lastNameMsg.classList.add('info-input')
                lastNameMsg.innerText = "Debe ser un apellido de 3 a 50 caracteres"
            }
            parrafoFuncion(lastNameMsg)
        })

        // new password validation
        pass.addEventListener('focus', function () {

            this.classList.remove('is-invalid')
            passMsg.classList.add('info-input')
            passMsg.innerText = "Ingresa una nueva contraseña"
            passMsg.classList.remove('error-input')

            if (passLetterLength('password')) {
                this.classList.add('is-valid')
                passMsg.classList.remove('info-input')
                passMsg.innerText = null
            }
            parrafoFuncion(passMsg)
        })

        // cambiar la contraseña es opcional, a menos de que escriba un caracter en el campo no va a recibir una alerta
        pass.addEventListener('blur', function () {

            this.classList.add('is-valid')
            passMsg.classList.remove('info-input')
            passMsg.innerText = null

            if (this.value.length > 0) {

                if (!passLetterLength('password')) {
                    this.classList.remove('is-valid')
                    this.classList.add('is-invalid')
                    passMsg.classList.remove('info-input')
                    passMsg.classList.add('error-input')
                    passMsg.innerText = "Debe ser un contraseña de 6 a 20 caracteres"

                } else {
                    this.classList.remove('is-invalid')
                    this.classList.add('is-valid')
                    passMsg.classList.remove('info-input')
                    passMsg.classList.remove('error-input')
                    passMsg.innerText = null
                }
            }
            parrafoFuncion(passMsg)
        })

        // cambiar la contraseña es opcional, a menos de que escriba un caracter en el campo no va a recibir una alerta
        pass.addEventListener('keydown', function (e) {
            const key = e.key;

            if (this.value.length > 0) {

                if (passLetterLength('password')) {
                    this.classList.remove('is-invalid')
                    this.classList.add('is-valid')
                    passMsg.classList.remove('info-input')
                    passMsg.classList.remove('error-input')
                    passMsg.innerText = null
                }

                if (!passLetterLength('password')) {
                    this.classList.remove('is-valid')
                    this.classList.add('is-invalid')
                    passMsg.classList.add('info-input')
                    passMsg.innerText = "Debe ser una contraseña de 6 a 20 caracteres"
                }
            }
            parrafoFuncion(passMsg)
        })

        // confirm new password validation
        pass2.addEventListener('focus', function () {

            this.classList.remove('is-invalid')
            pass2Msg.classList.add('info-input')
            pass2Msg.innerText = "Confirma la nueva contraseña"
            pass2Msg.classList.remove('error-input')

            if (passLetterLength('password')) {
                this.classList.add('is-valid')
                pass2Msg.classList.remove('info-input')
                pass2Msg.innerText = null
            }
            parrafoFuncion(pass2Msg)
        })

        // cambiar la contraseña es opcional, debe coincidir con el campo new password y ser valida
        pass2.addEventListener('blur', function () {

            this.classList.add('is-valid')
            pass2Msg.classList.remove('info-input')
            pass2Msg.innerText = null

            if (this.value.length > 0 || pass.value.length > 0) {
                if (!passLetterLength('password')) {
                    this.classList.remove('is-valid')
                    this.classList.add('is-invalid')
                    pass2Msg.classList.remove('info-input')
                    pass2Msg.classList.add('error-input')
                    pass2Msg.innerText = "El campo anterior debe tener entre 6 a 20 caracteres"

                }
                else if (this.value !== pass.value) {
                    this.classList.remove('is-valid')
                    this.classList.add('is-invalid')
                    pass2Msg.classList.remove('info-input')
                    pass2Msg.classList.add('error-input')
                    pass2Msg.innerText = "Deben coincidir las contraseñas"

                }
                else {
                    this.classList.remove('is-invalid')
                    this.classList.add('is-valid')
                    pass2Msg.classList.remove('info-input')
                    pass2Msg.classList.remove('error-input')
                    pass2Msg.innerText = null
                }
            }
            parrafoFuncion(pass2Msg)
        })

        // cambiar la contraseña es opcional, debe coincidir con el campo new password y ser valida
        pass2.addEventListener('keydown', function (e) {
            const key = e.key;

            if (this.value.length > 0 && pass.value > 0) {

                if (passLetterLength('password') && this.value === pass.value) {
                    this.classList.remove('is-invalid')
                    this.classList.add('is-valid')
                    pass2Msg.classList.remove('info-input')
                    pass2Msg.classList.remove('error-input')
                    pass2Msg.innerText = null
                }

                if (!passLetterLength('password')) {
                    this.classList.remove('is-valid')
                    this.classList.add('is-invalid')
                    pass2Msg.classList.add('info-input')
                    pass2Msg.innerText = "El campo anterior debe tener entre 6 a 20 caracteres"
                } else if (this.value !== pass.value) {
                    this.classList.remove('is-valid')
                    this.classList.add('is-invalid')
                    pass2Msg.classList.add('info-input')
                    pass2Msg.innerText = "Deben coincidir las contraseñas"
                }
                parrafoFuncion(pass2Msg)
            }
        })

        // currrent password validation
        // para confirmar los cambios debe ingresar la actual contraseña
        oldPassword.addEventListener('focus', function () {

            this.classList.remove('is-invalid')
            passConfirmMsg.classList.add('info-input')
            passConfirmMsg.innerText = "Ingresa tu contraseña para confirmar cambios"
            passConfirmMsg.classList.remove('error-input')

            if (passLetterLength('oldpassword')) {
                this.classList.add('is-valid')
                passConfirmMsg.classList.remove('info-input')
                passConfirmMsg.innerText = null
            }
            parrafoFuncion(passConfirmMsg)
        })

        oldPassword.addEventListener('blur', function () {

            if (this.value.length === 0) {
                this.classList.remove('is-valid')
                this.classList.add('is-invalid')
                passConfirmMsg.classList.remove('info-input')
                passConfirmMsg.classList.add('error-input')
                passConfirmMsg.innerText = "Ingresa tu contraseña para confirmar cambios"
            }
            else if (!passLetterLength('oldpassword')) {
                this.classList.remove('is-valid')
                this.classList.add('is-invalid')
                passConfirmMsg.classList.remove('info-input')
                passConfirmMsg.classList.add('error-input')
                passConfirmMsg.innerText = "Debe ser una contraseña de 6 a 20 caracteres"

            }
            else {
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                passConfirmMsg.classList.remove('info-input')
                passConfirmMsg.classList.remove('error-input')
                passConfirmMsg.innerText = null
            }
            parrafoFuncion(passConfirmMsg)
        })

        oldPassword.addEventListener('keydown', function (e) {
            const key = e.key;

            if (passLetterLength('oldpassword')) {
                this.classList.remove('is-invalid')
                this.classList.add('is-valid')
                passConfirmMsg.classList.remove('info-input')
                passConfirmMsg.classList.remove('error-input')
                passConfirmMsg.innerText = null
            }
            if (!passLetterLength('oldpassword')) {
                this.classList.remove('is-valid')
                this.classList.add('is-invalid')
                passConfirmMsg.classList.add('info-input')
                passConfirmMsg.innerText = "Debe ser una contraseña de 6 a 20 caracteres"
            }
            parrafoFuncion(passConfirmMsg)

        })

        // form validation
        formProfile.addEventListener('submit', (e) => {

            e.preventDefault();

            $('error-msg').innerText = null
            $('error').style.display = 'none'

            let errores = [
                {
                    id: 'name',
                    name: 'Nombre',
                    msg: ''
                },
                {
                    id: 'lastName',
                    name: 'Apellido',
                    msg: ''
                },
                {
                    id: 'password',
                    name: 'Nueva contraseña',
                    msg: ''
                },
                {
                    id: 'confirmpassword',
                    name: 'Confirmar contraseña',
                    msg: ''
                },
                {
                    id: 'oldpassword',
                    name: 'Contraseña',
                    msg: ''
                },
                {
                    id: 'avatar_user',
                    name: "Avatar",
                    msg: ''
                }
            ];

            for (let i = 0; i < elementForm.length - 1; i++) {

                // variables de scope
                const forIsElementFormName = elementForm[i].id === 'name';
                const forIsElementFormLastName = elementForm[i].id === 'lastName';
                const forIsElementFormPass = elementForm[i].id === 'password';
                const forIsElementFormConfirmPass = elementForm[i].id === 'confirmpassword';
                const forIsElementFormOldPass = elementForm[i].id === 'oldpassword';
                const forIsElementFormAvatar = elementForm[i].id === 'avatar_user';

                // funciones
                /* 
                  element ==> si el elemento del formulario corresponde con el id
                parametro ==> input id
                      msg ==> mensaje de error

                */
                const isErrorInput = (element, funcion , parametro, msg) => {
                    if (element && !funcion) {
                        elementForm[i].classList.add('is-invalid')
                        errores.map(error => {
                            if (element && error.id === parametro) {
                                error.msg = msg;
                            }
                        })
                    }
                }
                isErrorInput(forIsElementFormName, nameLetterLength('name'), "name", "De 3 a 50 caracteres obligatorio");
                isErrorInput(forIsElementFormLastName, nameLetterLength('lastName'), "lastName", "De 3 a 50 caracteres obligatorio");
                isErrorInput(forIsElementFormOldPass, passLetterLength('oldpassword'), "oldpassword", "De 6 a 20 caracteres obligatorio");
                if(($('password').value !== '')) {
                    isErrorInput(forIsElementFormPass, passLetterLength('password'), "password", "De 6 a 20 caracteres obligatorio");
                    if (forIsElementFormConfirmPass && !passLetterLength('password')) {
                        elementForm[i].classList.add('is-invalid')
                        errores.map(error => {
                            if (forIsElementFormConfirmPass && error.id === 'confirmpassword') {
                                error.msg = 'El campo nueva contraseña debe ser de 6 a 20 caracteres obligatorio';
                            }
                        })
                    }
                    else if (forIsElementFormConfirmPass && pass.value !== pass2.value) {
                        elementForm[i].classList.add('is-invalid')
                        errores.map(error => {
                            if (forIsElementFormConfirmPass && error.id === 'confirmpassword') {
                                error.msg = 'La confirmación de contraseña no coincide';
                            }
                        })
                    }
                }
                if(avatar.value !== ''){
                    isErrorInput(forIsElementFormAvatar, avatar.value.match(/\.(jpg|jpeg|png|gif|webp)$/), "avatar_user", "Sólo se permiten imágenes de extensión jpg,jpeg,pgn,gif,webp")
                }
                
            }

            let pasa;
            for (let i = 0; i < errores.length; i++) {
                if(errores[i].msg === '') {
                    pasa = true
                } else {
                    pasa = false
                    break
                }
            }
            
            if(pasa !== true) {
                
                for(let j= 0; j < errores.length; j++) {
    
                    if (errores[j].msg.length > 0) {
                        $('error').style.display = "block";
                        $('error-msg').innerHTML = `Debes completar los campos señalados:`;
                        break
                    }
                }
                for(let j= 0; j < errores.length; j++) {
        
                    if (errores[j].msg.length > 0) {
                        for(let i = 0; i < elementForm.length - 1; i++){
                            if (elementForm[i].classList.contains('is-invalid')) {
                                if ( elementForm[i].id == errores[j].id) {
                                    $('error-msg').innerHTML += `<br><b>${errores[j].name}</b>: ${errores[j].msg}`
                                }
                            }
                        }
                    }
                }

                parrafoFuncion(avatarMsg)
                parrafoFuncion(nameMsg)
                parrafoFuncion(lastNameMsg)
                parrafoFuncion(passMsg)
                parrafoFuncion(pass2Msg)
                parrafoFuncion(passConfirmMsg)
            } else {
                    
            for (let i = 0; i < elementForm.length - 1; i++) {
                    elementForm[i].classList.remove('is-invalid')
                    elementForm[i].classList.add('is-valid')
                }
                error.style.display = 'none';
                errorMsg.innerHTML = null;
                
                formProfile.submit()
                
            }
            
       
        })
    })

}

