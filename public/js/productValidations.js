window.addEventListener("load", function () {

    let validations = {
        name: /^[a-zA-Z0-9\s]{1,40}$/,
        number: /^[0-9]{1,40}$/,
        letters: /^[a-zA-Z\s]{1,40}$/
    }

    let name = document.getElementById('name');
    let category = document.getElementById('category');
    let brand = document.getElementById('brand');
    let description = document.getElementById('description');
    let year = document.getElementById('year');
    let features_style = document.getElementById('features_style');
    let features_genre = document.getElementById('features_genre');
    let features_use = document.getElementById('features_use');
    let regularPrice = this.document.getElementById('regularPrice')
    let specialPrice = this.document.getElementById('specialPrice')
    let deliveryTime = this.document.getElementById('deliveryTime')
    let weight_package = this.document.getElementById('weight_package')
    let color_available = this.document.getElementById('color_available')
    let size_available = this.document.getElementById('size_available')
    let imageMain = this.document.getElementById('image_main')
    let imageFront = this.document.getElementById('image-front')
    let imageBack = this.document.getElementById('image-back')
    let form = document.getElementById('form')

    var errors = {
        name: '',
        category: '',
        brand: '',
        description: '',
        year: '',
        features_style: '',
        features_genre: '',
        features_use: '',
        regularPrice: '',
        specialPrice: '',
        deliveryTime: '',
        weight_package: '',
        color_available: '',
        size_available: '',
        imageMain: ''
    }

    // ####   Validate Name   ####
    name.addEventListener('blur', function () {
        if (name.value == '') {
            errors.name = "El nombre no puede estar vacio"
            console.log(errors.name)
            this.style.border = " 2px solid red";
            document.getElementById('errorNameLabel').innerHTML = errors.name;
        }
    })

    name.addEventListener('blur', function () {
        if (name.value == '') {
            errors.name = "El nombre no puede estar vacio"
            console.log(errors.name)
            this.style.border = " 2px solid red";
            document.getElementById('errorNameLabel').innerHTML = "El nombre no puede estar vacio";
        } else if (name.value.match(validations.name)) {
            errors.name = ""
            console.log(errors.name)
            this.style.border = " 2px solid green";
            document.getElementById('errorNameLabel').innerHTML = errors.name;
        } else {
            errors.name = "Solo se permiten Numeros, Letras y Espacios"
            console.log(errors.name)
            this.style.border = " 2px solid red";
            document.getElementById('errorNameLabel').innerHTML = "Solo se permiten Numeros, Letras y Espacios";
        }
    })

    // ####   Validate Category   ####
    category.addEventListener('blur', function () {
        if (category.value == '') {
            this.style.border = " 2px solid red";
            document.getElementById('errorCategoryLabel').innerHTML = "Selecciona una categoria";
        } else {
            errors.category = ''
            this.style.border = "2px solid green";
            document.getElementById('errorCategoryLabel').innerHTML = "";
        }
    })

    // ####   Validate Brand   ####
    brand.addEventListener('blur', function () {
        if (brand.value == '') {
            this.style.border = "2px solid red";
            document.getElementById('errorBrandLabel').innerHTML = "Selecciona una marca";
        } else {
            errors.brand = ''
            this.style.border = "2px solid green";
            document.getElementById('errorBrandLabel').innerHTML = "";
        }
    })

    // ####   Validate Year   ####
    year.addEventListener('blur', function () {
        if (year.value < 1900 || year.value > 2021) {
            this.style.border = "2px solid red";
            document.getElementById('errorYearLabel').innerHTML = "El año no corresponde";
        } else {
            errors.year = ''
            this.style.border = "2px solid green";
            document.getElementById('errorYearLabel').innerHTML = "";
        }
    })

    // ####   Validate Description   ####
    description.addEventListener('blur', function () {
        if (description.value == '') {
            this.style.border = "2px solid red";
            document.getElementById('errordescriptionLabel').innerHTML = "Debes añadir una descripción";
        } else {
            errors.description = ''
            this.style.border = "2px solid green";
            document.getElementById('errordescriptionLabel').innerHTML = "";
        }
    })

    // ####   Validate Features Style  ####
    features_style.addEventListener('blur', function () {
        if (features_style.value == '') {
            this.style.border = "2px solid red";
            document.getElementById('errorStyleLabel').innerHTML = "Selecciona un Estilo";
        } else {
            errors.features_style = ''
            this.style.border = "2px solid green";
            document.getElementById('errorStyleLabel').innerHTML = "";
        }
    })

    // ####   Validate Genre   ####
    features_genre.addEventListener('blur', function () {
        if (features_genre.value == '') {
            this.style.border = "2px solid red";
            document.getElementById('errorGenreLabel').innerHTML = "Selecciona un Genero";
        } else {
            errors.features_genre = ''
            this.style.border = "2px solid green";
            document.getElementById('errorGenreLabel').innerHTML = "";
        }
    })

    // ####   Validate Usa   ####
    features_use.addEventListener('blur', function () {
        if (features_use.value == '') {
            this.style.border = "2px solid red";
            document.getElementById('errorUseLabel').innerHTML = "Selecciona un USo";
        } else {
            errors.features_use = ''
            this.style.border = "2px solid green";
            document.getElementById('errorUseLabel').innerHTML = "";
        }
    })

    // ####   Validate Precio   ####

    regularPrice.addEventListener('blur', function () {
        if (regularPrice.value == '') {
            this.style.border = "2px solid red";
            document.getElementById('errorUseLabel').innerHTML = "Inserta un Precio";
        } else {
            errors.regularPrice = ''
            this.style.border = "2px solid green";
            document.getElementById('errorUseLabel').innerHTML = "";
        }
    })
    regularPrice.addEventListener('blur', function () {
        if (regularPrice.value.match(validations.number)) {
            errors.regularPrice = ''
            this.style.border = " 2px solid green";
            document.getElementById('errorPriceLabel').innerHTML = "";
        } else {
            errors.regularPrice = 'Debes insertar el precio sin punto ni coma'
            this.style.border = " 2px solid red";
            document.getElementById('errorPriceLabel').innerHTML = "Debes insertar el precio sin punto ni coma"
        }
    })

    // ####   Validate Descuento   ####
    specialPrice.addEventListener('blur', function () {
        if (specialPrice.value.match(validations.number)) {
            this.style.border = " 2px solid green";
            document.getElementById('errorSpecialPriceLabel').innerHTML = "";
        } else {
            errors.specialPrice = ''
            this.style.border = " 2px solid red";
            document.getElementById('errorSpecialPriceLabel').innerHTML = "Debes insertar el precio sin punto ni coma"
        }
    })

    // ####   Validate Delivery Time   ####
    deliveryTime.addEventListener('blur', function () {
        if (deliveryTime.value == '') {
            this.style.border = "2px solid red";
            document.getElementById('errorDeliveryTimeLabel').innerHTML = "Selecciona un tiempo de entrega";
        } else {
            errors.deliveryTime = ''
            this.style.border = "2px solid green";
            document.getElementById('errorDeliveryTimeLabel').innerHTML = "";
        }
    })

    // ####   Validate Peso   ####
    weight_package.addEventListener('blur', function () {
        if (weight_package.value == '') {
            this.style.border = "2px solid red";
            document.getElementById('errorWeigthLabel').innerHTML = "Inserta un Peso";
        } else {
            errors.weight_package = ''
            this.style.border = "2px solid green";
            document.getElementById('errorWeigthLabel').innerHTML = "";
        }
        if (weight_package.value.match(validations.number)) {
            errors.weight_package = ''
            this.style.border = " 2px solid green";
            document.getElementById('errorWeigthLabel').innerHTML = "";
        } else {
            errors.weight_package = 'Debes insertar el peso en gramos sin punto ni coma'
            this.style.border = " 2px solid red";
            document.getElementById('errorWeigthLabel').innerHTML = "Debes insertar el peso en gramos sin punto ni coma"
        }
    })

    // ####   Validate Color   ####
    color_available.addEventListener('blur', function () {
        if (color_available.value == '') {
            this.style.border = "2px solid red";
            document.getElementById('errorColorLabel').innerHTML = "Ingresa el color del producto";
        } else {
            errors.color_available = ''
            this.style.border = "2px solid green";
            document.getElementById('errorColorLabel').innerHTML = "";
        }
        if (color_available.value.match(validations.letters)) {
            errors.color_available = ''
            this.style.border = " 2px solid green";
            document.getElementById('errorColorLabel').innerHTML = "";
        } else {
            errors.color_available = 'El color solo permite letras'
            this.style.border = " 2px solid red";
            document.getElementById('errorColorLabel').innerHTML = "El color solo permite letras"
        }
    })

    // ####   Validate Size  ####
    size_available.addEventListener('blur', function () {
        if (size_available.value == '') {
            this.style.border = "2px solid red";
            document.getElementById('errorSizeLabel').innerHTML = "Selecciona un talle para el producto";
        } else {
            errors.size_available = ''
            this.style.border = "2px solid green";
            document.getElementById('errorSizeLabel').innerHTML = "";
        }
    })

    // ####   Validate Imagen  ####
    imageMain.addEventListener('change', function () {
        console.log(imageMain.value);
        let fname = imageMain.value;
        let re = /(\.jpg|\.jpeg|\.gif|\.png)$/i;

        if (imageMain.name == "" || !re.exec(fname)) {
            errors.imageMain = 'Debe completar con una foto con formato jpg, jpeg, png o gif'
            //last_name.classList.add('face_pic-invalido');
            this.style.border = " 2px solid red";
            document.querySelector("#errorImageLabel").innerHTML =
                "Debe completar con una foto con formato jpg, jpeg, png o gif ";
        } else {
            errors.imageMain = ''
            this.style.border = " 2px solid green";
            document.querySelector("#errorImageLabel").innerHTML = "";
        }
    });
    
    imageFront.addEventListener('change', function () {
        console.log(imageMain.value);
        let fname = imageMain.value;
        let re = /(\.jpg|\.jpeg|\.gif|\.png)$/i;
        if (!re.exec(fname)) {
            errors.imageMain = 'Debe completar con una foto con formato jpg, jpeg, png o gif'
            //last_name.classList.add('face_pic-invalido');
            this.style.border = " 2px solid red";
            document.querySelector("#errorImageLabel").innerHTML =
                "Debe completar con una foto con formato jpg, jpeg, png o gif ";
        } else {
            errors.imageMain = ''
            this.style.border = " 2px solid green";
            document.querySelector("#errorImageLabel").innerHTML = "";
        }
    });

    imageBack.addEventListener('change', function () {
        console.log(imageMain.value);
        let fname = imageMain.value;
        let re = /(\.jpg|\.jpeg|\.gif|\.png)$/i;

        if (!re.exec(fname)) {
            errors.imageMain = 'Debe completar con una foto con formato jpg, jpeg, png o gif'
            //last_name.classList.add('face_pic-invalido');
            this.style.border = " 2px solid red";
            document.querySelector("#errorImageLabel").innerHTML =
                "Debe completar con una foto con formato jpg, jpeg, png o gif ";
        } else {
            errors.imageMain = ''
            this.style.border = " 2px solid green";
            document.querySelector("#errorImageLabel").innerHTML = "";
        }
    });
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let alertErrors = []
        for (property in errors) {
            if (`${errors[property]}` != '') {
                alertErrors.push('\n' + `${errors[property]}`)
            }
        }
        if (alertErrors == '') {
            form.submit();
        } else {
            alert(alertErrors);
        }
        
    })
})

