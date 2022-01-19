window.addEventListener("load", function() {

    let signinButton = document.querySelector("#signin a");
    let loginBox = document.querySelector('#login_box');
    let loginCloseButton = document.querySelector('#closingButton');
    let loginView = document.querySelector('#loginView');
    let keepMeLoggedInCheckbox = document.querySelector(".keepMeLoggedIn");
    let checkbox = document.querySelector(".keepMeLoggedIn input");
    let email = document.querySelector('[name="email"]');
    let emailError = document.querySelector(".emailAddress .error");
    let passwordBox = document.querySelector(".login-box-text-input-password");
    let passwordError = document.querySelector(".passwordField .error");

    function switchModal() {
        loginBox.classList.toggle('is-active');
        if (loginCloseButton.style.display === 'none') {
            loginCloseButton.style.display = 'block';
          } else {
            loginCloseButton.style.display = 'none';
          };
        
        if (loginView.style.display === 'none') {
          loginView.style.display = 'block';
        } else {
          loginView.style.display = 'none';
        };
        
        loginView.style.display = 'block';
    }

    function resetModal() {
        let password = document.querySelector('[name="psw"]');
        let email = document.querySelector('[name="email"]');
        let emailBox = document.querySelector(".login-box-text-input");
        let passwordBox = document.querySelector(".login-box-text-input-password");

        password.value = null;
        email.value = null;
        passwordBox.classList.remove('invalid');
        emailBox.classList.remove('invalid');
        checkbox.checked = true;
    }

    console.log(sessionStorage.getItem('email_sent'));

    //Validadndo si hay error desde controller
    const queryString = window.location.search;
    const parameters = new URLSearchParams(queryString);
    const errorType = parameters.get('error');
    console.log(errorType);

    if(errorType != null){
        if(errorType == 1){
            //El usuario no existe
            switchModal();
            emailBox.classList.toggle('invalid');
            emailError.innerHTML = "El usurario ingresado no coincide con nuetsra base de datos";
        } else {
            //La contraseña es erronea
            console.log('entró donde debia');
            passwordBox.classList.toggle('invalid');
            passwordError.innerHTML = "La contraseña ingresada es erronea";
            email.setAttribute('value', sessionStorage.getItem('email_sent'));
        }

        switchModal();
    }

    signinButton.addEventListener("click", function(e){
        e.preventDefault();
        switchModal();
    });

    loginCloseButton.addEventListener("click", function(e){
        switchModal();
        resetModal();
    });

    keepMeLoggedInCheckbox.addEventListener("click", function(e){
        console.log('entro a la validacion de loggedin')
        if(checkbox.checked){
            checkbox.checked = false;
        }else {
            checkbox.checked = true;
        }
    });



})

