window.addEventListener("load", function() {

    let email = document.querySelector('[name="email"]');
    let password = document.querySelector('[name="psw"]');
    let passwordRepeat = document.querySelector('[name="pswrepeat"]');
    let first_name = document.querySelector('[name="first_name"]');
    let last_name = document.querySelector('[name="last_name"]');
    let country = document.querySelector('[name="pais"]');
    let face_pic = document.getElementById('facepic');
    
    
    let formulario = document.querySelector("form");
    let submitButton = document.querySelector(".signupbtn");

    
    function emailIsValid (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
    

    //Validaciones para Email
    email.addEventListener('blur', function(){
        if(email.value == '' || !emailIsValid(email.value)){
            email.classList.add('email-invalido');
            document.querySelector('#comentario-email').innerText = "Email invalido o vacio. ";
        }else{
            email.classList.remove('email-invalido');
            document.querySelector('#comentario-email').innerText = "";
        }
    })


    //Validaciones para password
    password.addEventListener('blur', function(){
        if(password.value == '' || password.value.length < 8){
                password.classList.add('psw-invalido');
                document.querySelector('#comentario-psw').innerText = "Debe completar una password de al menos 8 caracteres. ";
            }else{
                email.classList.remove('psw-invalido');
                document.querySelector('#comentario-psw').innerText = "";
            }        
    })



    //Validaciones para Repeat Password
    passwordRepeat.addEventListener('blur', function(){
        if(passwordRepeat.value === '' || passwordRepeat.value != password.value){
            passwordRepeat.classList.add('pswrepeat-invalido');
            document.querySelector('#comentario-pswrepeat').innerText = "Debe repetir la clave y que coincidan. ";
        }else{
            email.classList.remove('pswrepeat-invalido');
            document.querySelector('#comentario-pswrepeat').innerText = "";
        } 
    })
    


    //Validaciones para Nombre
    first_name.addEventListener('blur', function(){
        if(first_name.value == '' || first_name.value.length < 2){
            first_name.classList.add('first_name-invalido');
            document.querySelector('#comentario-first_name').innerText = "Debe completar con un nombre de al menos dos caracteres. ";
        }else{
            email.classList.remove('first_name-invalido');
            document.querySelector('#comentario-first_name').innerText = "";
        } 
    })
    


    //Validaciones para Apellido
    last_name.addEventListener('blur', function(){
        if(last_name.value == '' || last_name.value.length < 2){
            last_name.classList.add('last_name-invalido');
            document.querySelector('#comentario-last_name').innerText = "Debe completar con un apellido de al menos dos caracteres. ";
        }else{
            email.classList.remove('last_name-invalido');
            document.querySelector('#comentario-last_name').innerText = "";
        } 
    })
    


    //Validaciones para Pais
    country.addEventListener('blur', function(){
        if(country.value == '' || country.value.length < 2){
            last_name.classList.add('country-invalido');
            document.querySelector('#comentario-pais').innerText = "Debe completar con un pais valido. ";
        }else{
            email.classList.remove('country-invalido');
            document.querySelector('#comentario-pais').innerText = "";
        } 
    })

    face_pic.addEventListener('load', function(){
  
        
        console.lot('facepic');
        if(face_pic.name == '' || !(face_pic.type == "jpg" || face_pic.type == "jpeg" || face_pic.type == "gif" || face_pic.type == "png" ) ){
            last_name.classList.add('face_pic-invalido');
            document.querySelector('#comentario-pais').innerText = "Debe completar con una foto con formato jpg, jpeg, png o tif ";
        }else{
            email.classList.remove('face_pic-invalido');
            document.querySelector('#comentario-face_pic').innerText = "";
        } 
    })
    

   


    //Validacion del boton Submit
    // submitButton.addEventListener('click', function(e){

    //         e.preventDefault();

    //         console.group('entrando al fetch');
    //         console.log(email.value);
            
    //         fetch("http://localhost:3000/users/" + email.value)
    //             .then(function(respuesta){
    //                 console.log('entro al primer then');
    //                 console.log(respuesta.json());
    //                 return respuesta.json();
                                        
    //             })
    //             .then(function(informacion){
    //                 if(informacion!=null){
    //                     console.log('el email no estaba registrado con anterioridad');
    //                 } else {
    //                     alert('El email no puede estar repetido');
                        
    //                 }
    //             });


            
    //     }


    // )


});