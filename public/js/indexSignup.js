window.addEventListener("load", function() {

    // Cargo variables

    let email = document.querySelector("#email-input");//acá va el valor del campo
    let emailBox = document.querySelector(".form-item.email");//acá va el clicked
    let emailLabel = document.querySelector(".form-item.email .form-label");//acá va el clicked y el valid
    let emailField = document.querySelector(".form-item.email .field-input");//acá va el invalid
    let emailErrorScriptActive = document.querySelector("#email-helper-text-script");//acá se activa el error (invalid y errorFromScript)
    let emailErrorContrCancel = document.querySelector(".form-item.email ul");//acá se activa el error
    let emailError = document.querySelector("#email-helper-text-script .caption");//acá va el mensaje de error

    let password = document.querySelector("#password-input");//acá va el valor del campo
    let passwordBox = document.querySelector(".form-item.password");//acá va el clicked
    let passwordLabel = document.querySelector(".form-item.password .form-label");//acá va el clicked y el valid
    let passwordField = document.querySelector(".form-item.password .field-input");//acá va el invalid
    let passwordErrorScriptActive = document.querySelector("#password-helper-text-script");//acá se activa el error (invalid y errorFromScript)
    let passwordErrorContrCancel = document.querySelector(".form-item.password ul");//acá se activa el error
    let passwordError = document.querySelector("#password-helper-text-script .caption");//acá va el mensaje de error

    let password2 = document.querySelector("#password-repeat-input");//acá va el valor del campo
    let password2Box = document.querySelector(".form-item.password-repeat");//acá va el clicked
    let password2Label = document.querySelector(".form-item.password-repeat .form-label");//acá va el clicked y el valid
    let password2Field = document.querySelector(".form-item.password-repeat .field-input");//acá va el invalid
    let password2ErrorScriptActive = document.querySelector("#password-repeat-helper-text-script");//acá se activa el error (invalid y errorFromScript)
    let password2Error = document.querySelector("#password-repeat-helper-text-script .caption");//acá va el mensaje de error

    let country = document.querySelector("#country-input");//acá va el valor del campo
    let countryBox = document.querySelector(".form-item.country");//acá va el clicked
    let countryLabel = document.querySelector(".form-item.country .form-label");//acá va el clicked
    let countryField = document.querySelector(".form-item.country .field-input");//acá va el invalid
    let countryError = document.querySelector(".form-item.country .helper-text");//acá va el mensaje de error

    let marketCheckLabel = document.querySelector(".market .checkbox-span");//acá va el click
    let marketCheckInput = document.querySelector("#market");//acá va el valor
    
    let keepMeLoggedIn = document.querySelector(".checkbox-span");//acá va el valor de check

    let formulario = document.querySelector(".panel-content form");
    let submitButton = document.querySelector("#signup-submit");

    //Creacion de funciones
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };
    function emailIsValid (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    };
    function getCookie(cname) {

        var allcookies = document.cookie;
        var arrayb = allcookies.split("; ");
        for (let i = 0; i<arrayb.length; i++){
            if (arrayb[i].startsWith(cname)){
                return arrayb[i].replace(cname+"=","");
            }
        }
    };

    //Funcionalidad de check para "recordar usuario"
/*     keepMeLoggedIn.addEventListener("click", function(e){
        if(rememberLabel.classList.contains("clicked")){
            keepMeLoggedIn.checked = false;
        }else {
            keepMeLoggedIn.checked = true;
        }
        rememberLabel.classList.toggle("clicked");
        rememberSVG.classList.toggle("clicked");
    }); */

    //Validaciones para Email
    email.addEventListener('focus', function(){
        emailErrorContrCancel.classList.remove('errorFromController');
        console.log(email.value);
        email.removeAttribute('value');
        emailBox.classList.add('clicked');
        emailLabel.classList.add('clicked');
        emailField.classList.remove('invalid');
        emailErrorScriptActive.classList.remove('errorFromScript')
        emailError.innerHTML = "";
        emailLabel.classList.remove('valid');
    });
    email.addEventListener('blur', function(){
        console.log('validacion email:');
        console.log(email.value);
        console.log(emailIsValid(email.value));
        if(email.value == '' || !emailIsValid(email.value)){
            emailField.classList.add('invalid');
            emailErrorScriptActive.classList.add('errorFromScript');
            emailError.innerHTML = "Ingresa una dirección de correo electrónico válida";
        }else {
            emailField.classList.remove('invalid')
            emailErrorScriptActive.classList.remove('errorFromScript')
            emailBox.classList.remove('clicked');
            emailLabel.classList.remove('clicked');
            emailLabel.classList.add('valid');

        }
    });

    email.addEventListener('keyup', function(event){
        // El número 13 es el "Enter" en el teclado
        if (event.keyCode === 13) {
            event.preventDefault();
            submitButton.click();
        }
    })

    //Validaciones para Password
    password.addEventListener('focus', function(){
        passwordErrorContrCancel.classList.remove('errorFromController');
        console.log(password.value);
        password.removeAttribute('value');
        passwordBox.classList.add('clicked');
        passwordLabel.classList.add('clicked');
        passwordField.classList.remove('invalid');
        passwordErrorScriptActive.classList.remove('errorFromScript')
        passwordError.innerHTML = "";
        passwordLabel.classList.remove('valid');
    });
    password.addEventListener('blur', function(){
        console.log('validacion password:');
        console.log(password.value);
        if(password.value == '' || password.value.length < 8){
            passwordField.classList.add('invalid');
            passwordErrorScriptActive.classList.add('errorFromScript');
            passwordErrorScriptActive.classList.add('invalid');
            if(password.value == ''){
                passwordError.innerHTML = "Debes ingresar una contraseña";
            }else{
                passwordError.innerHTML = "La contraseña debe tener al menos 8 dígitos";
            };
        }else {
            passwordField.classList.remove('invalid')
            passwordErrorScriptActive.classList.remove('errorFromScript')
            passwordBox.classList.remove('clicked');
            passwordLabel.classList.remove('clicked');
            passwordLabel.classList.add('valid');
        }
    });

    password.addEventListener('keyup', function(event){
        // El número 13 es el "Enter" en el teclado
        if (event.keyCode === 13) {
            event.preventDefault();
            submitButton.click();
        }
    })

    //Validaciones para Password Repeat
    password2.addEventListener('focus', function(){
        console.log(password.value);
        password2.removeAttribute('value');
        password2Box.classList.add('clicked');
        password2Label.classList.add('clicked');
        password2Field.classList.remove('invalid');
        password2ErrorScriptActive.classList.remove('errorFromScript')
        password2Error.innerHTML = "";
        password2Label.classList.remove('valid');
    });
    password2.addEventListener('blur', function(){
        console.log('validacion password:');
        console.log(password.value);
         if(password.value != '' && (password2.value == '' || password2.value != password.value)){
            password2Field.classList.add('invalid');
            password2ErrorScriptActive.classList.add('errorFromScript');
            password2ErrorScriptActive.classList.add('invalid');
            if(password2.value == ''){
                password2Error.innerHTML = "Debes ingresar una contraseña";
            }else{
                password2Error.innerHTML = "Las contraseñas ingresadas no coinciden";
            };
        }else {
            password2Field.classList.remove('invalid')
            password2ErrorScriptActive.classList.remove('errorFromScript')
            password2Box.classList.remove('clicked');
            password2Label.classList.remove('clicked');
            if(password.value != ''){
                password2Label.classList.add('valid');
            }
        }
    });

    //Validaciones para Pais
    country.addEventListener('focus', function(){
        countryErrorContrCancel.classList.remove('errorFromController');
        console.log(country.value);
        country.removeAttribute('value');
        countryBox.classList.add('clicked');
        countryLabel.classList.add('clicked');
        countryField.classList.remove('invalid');
        countryErrorScriptActive.classList.remove('errorFromScript')
        countryError.innerHTML = "";
        countryLabel.classList.remove('valid');
    });
    country.addEventListener('blur', function(){
        console.log('validacion country:');
        console.log(country.value);
        console.log(emailIsValid(country.value));
        if(country.value == ''){
            countryField.classList.add('invalid');
            countryErrorScriptActive.classList.add('errorFromScript');
            countryError.innerHTML = "Ingresa una un país o regíon";
        }else {
            countryField.classList.remove('invalid')
            countryErrorScriptActive.classList.remove('errorFromScript')
            countryBox.classList.remove('clicked');
            countryLabel.classList.remove('clicked');
            countryLabel.classList.add('valid');
        }
    });










    marketCheckLabel.addEventListener("click", function(e){
        if(marketCheckLabel.classList.contains("clicked")){
            marketCheckInput.checked = false;
        }else {
            marketCheckInput.checked = true;
        }
        marketCheckLabel.classList.toggle("clicked");
    });


    //Validacion del boton Submit
    submitButton.addEventListener('click', function(e){

        e.preventDefault();

        let validEmail = 0;
        let validPassword = 0;

        if(email.value == '' || !emailIsValid(email.value)){
            emailInput.classList.add('invalid')
            emailError.innerHTML = "Ingresa una dirección de correo electrónico válida";

        }else {
            validEmail = 1;
        };

        if(password.value == ''){
            passwordInput.classList.add('invalid');
            passwordError.innerHTML = "Ingresa una contraseña";
        } else {
            validPassword = 1;
        };

        if(validEmail * validPassword == 1){
            console.log('todo bien');
            console.group('entrando al fetch');
            password_given = password.value
            fetch("http://localhost:3000/users/" + email.value)
                .then(function(respuesta){
                    console.log('entro al primer then');
                    return respuesta.json();                    
                })
                .then(function(informacion){
                    if(informacion!=null){
                        // let correct_password = informacion.passwd
                        //const check = bcrypt.compareSync(password_given, correct_password);
                        // const check = (correct_password == password_given)
                        // console.log('contraseñas: ');
                        // console.log('correct_password: ' + correct_password);
                        // console.log('password given: ' + password_given);
                        // if(check){
                        //     console.log('todo ok');
                        //     //formulario.submit();
                        // } else {
                        //     console.log('contraseña incorrecta');
                        //     passwordBox.classList.toggle('invalid');
                        //     passwordError.innerHTML = "La contraseña ingresada es incorrecta";
                        // }
                        setCookie('email_sent', email.value, 1);
                        setCookie('urlFrom', window.location.href, 0.007);
                        setCookie('keepMeLoggedIn', keepMeLoggedIn.checked, 0.007);//10min de duracion
                        console.log("valor grabado en la cookie desde submit:");
                        console.log(getCookie("urlFrom"));
                        console.log(document.cookie)
                        formulario.submit();
                    } else {
                        console.log('usuario incorrecto');
                        emailInput.classList.toggle('invalid');
                        emailError.innerHTML = "La dirección de correo ingresada no coincide con ninguna en nuestra base de datos";
                    }
                });


            
        }


    })

});

