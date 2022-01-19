window.addEventListener("load", function() {

    let password = document.querySelector('[name="psw"]');
    let email = document.querySelector('[name="email"]');
    let emailBox = document.querySelector(".login-box-text-input");
    let passwordBox = document.querySelector(".login-box-text-input-password");
    let emailError = document.querySelector(".emailAddress .error");
    let passwordError = document.querySelector(".passwordField .error");
    let formulario = document.querySelector(".login-box form");
    let submitButton = document.querySelector(".login-box-submit-button");

    //Validadndo si hay error desde controller
    const queryString = window.location.search;
    const parameters = new URLSearchParams(queryString);
    const errorType = parameters.get('error');

    //Funciones
    
    function validateEmail(inputText){

        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(inputText.value == ''){
            return false;
        }

        if(inputText.value.match(mailformat)){
            return true;
        } else {
            return false;
            }
    }
    
    function emailIsValid (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
    

    //Validaciones para Email
    email.addEventListener('blur', function(){
        if(email.value == '' || !emailIsValid(email.value)){
            emailBox.classList.toggle('invalid')
        }else {
            emailBox.classList.remove('invalid')
        }
    })

    email.addEventListener('focus', function(){
        email.removeAttribute('value');
        if(email.value == '' || !validateEmail(email.value)){
            emailBox.classList.remove('invalid');
            emailError.innerHTML = "Ingresa una dirección de correo electrónico válida";
        }
    })

    //Validaciones para password
    password.addEventListener('blur', function(){
        if(password.value == ''){
            passwordBox.classList.toggle('invalid')
        }else {
            passwordBox.classList.remove('invalid')
        }
    })

    password.addEventListener('focus', function(){
        if(password.value == ''){
            passwordBox.classList.remove('invalid');
            passwordError.innerHTML = "Ingresa una contraseña";
        }
    })

    //Validacion del boton Submit
    submitButton.addEventListener('click', function(e){

        e.preventDefault();

        let validEmail = 0;
        let validPassword = 0;

        if(email.value == '' || !emailIsValid(email.value)){
            emailBox.classList.add('invalid')
            emailError.innerHTML = "Ingresa una dirección de correo electrónico válida";

        }else {
            validEmail = 1;
        };

        if(password.value == ''){
            passwordBox.classList.add('invalid');
            passwordError.innerHTML = "Ingresa una contraseña";
        } else {
            validPassword = 1;
        };

        if(validEmail * validPassword == 1){
            console.log('todo bien');
            console.group('entrando al fetch');
            //const password_given = bcrypt.hashSync(password.value, 10);
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
                        sessionStorage.setItem('email_sent', email.value);
                        sessionStorage.setItem('password_sent', password.value);
                        formulario.submit();
                    } else {
                        console.log('usuario incorrecto');
                        emailBox.classList.toggle('invalid');
                        emailError.innerHTML = "La dirección de correo ingresada no coincide con ninguna en nuestra base de datos";
                    }
                });


            
        }


    })


})