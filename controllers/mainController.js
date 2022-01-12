const fs = require('fs');
const path = require('path');
const { response } = require("express")
const { validationResult } = require("express-validator")

const productsFilePath = path.join(__dirname, '../data/products.json');
//const usuariosFilePath = path.join(__dirname, '../data/users/users.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); // pasa el json a un array
//const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8')); // pasa el json a un array
const basketFilePath = path.join(__dirname, '../data/shopping-cart.json');
const cart_basket = JSON.parse(fs.readFileSync(basketFilePath, 'utf-8'));

const db = require('../database/models')

//const products = require('../Data/products.json');

// Acá nos falta un objeto literal con las acciones para cada ruta
let mainController = {
    
    home: (req, res) => {
        db.Product.findAll({
            //order:[['rating','DESC']],
            include:[{association:'Brand'}]
        }).then((products)=>{
            res.render('home',{products})
        })
        .catch((error)=>{
            console.log(error);
            res.send(500);
        });

        // modificar con sequilize
        //console.log('entré al home');
        //res.render('home', { products })
    },

    product: (req, res) => {
        const id = req.params.id;
        db.Product.findByPk(id)({
            include:[{association:'Brand'}]
        })
        .then((product)=>{
            res.render('product', product);
        })
        .catch((error)=>{
            console.log(error);
            res.send(500);
        });
        
        // modificar con sequilize
        //const product = products.find((prod) => prod.id == req.params.id);
        //res.render('product', { products, product })
    },

    productSearch: (req, res) => {

        db.Product.findAll({
            //order:[['rating','DESC']],
            include:[{association:'Brand'}]
        }).then((products)=>{
            res.render("productSearch", { products, resultsPerPage: 12 })
        })
        .catch((error)=>{
            console.log(error);
            res.send(500);
        });
        //modificar con sequilize 
        //res.render('productSearch', { products, resultsPerPage: 12 })
    },

    signin: (req, res) => {
        res.render('signin')
    },

    checksignin: (req, res) => {
        const usuarioCheckIn = usuarios.find((usuario) => usuario.email == req.body.email);
        console.log(usuarioCheckIn);
        const errorMessage = 'el email o el password no coinciden con nuestros registros';

        if (usuarioCheckIn) { //usuario existe (está registrado)
            //let emailUsuario = usuarioCheckIn.email;
            const passwordEncriptadaUsuario = usuarioCheckIn.password;
            //console.log(passwordEncriptadaUsuario);
            const bcrypt = require('bcryptjs');
            const check = bcrypt.compareSync(req.body.psw, passwordEncriptadaUsuario);
            //console.log(check);

            if (check) { //usuario existe y la contraseña es correcta
                req.session.usuario = usuarioCheckIn.id;
                req.session.loggedin = true;
                req.session.save();
                if (req.body.remember != undefined) {
                    res.cookie('usuarioRecordado', usuarioCheckIn.id, { maxAge: 1800000 }); //Duracion de cookie: 30 minutos
                }
                return res.redirect('/');
            } else { //usuario existe, pero ingresó mal la contraseña
                //console.log(errorMessage[0]);
                res.render('signin', { errorMessage });
            }

        } else {
            //console.log(errorMessage[0]);
            res.render('signin', { errorMessage });
        };
        req.session.save();
    },

    signup: (req, res) => {
        res.render('signupv2')
    },

    crearperfil: (req, res) => {
        //console.log(validations);
        console.log(req.body);
        console.log(req.file);

        let response = req.body;
        let errores = validationResult(req);
        console.log(errores);
        //console.log(errores.keys.length);
        //console.log(errores.msg)

        //agregar control de que el email no sea repetido;

        //agregar control de que el email del segundo campo sea igual al ingresado en el campo anterior;




        if (errores.isEmpty()) {



            const bcrypt = require('bcryptjs');
            const passEncriptada = bcrypt.hashSync(req.body.psw, 10);

            const nuevoUsuario = {

                //id: usuarios[usuarios.length - 1].id + 1, // le crea un id 1 mas alto que el del ultimo
                email: req.body.email,
                passwd: passEncriptada,
                first_name: req.body.first_name,
                first_name: req.body.last_name,
                country: req.body.pais,
                face_pic: req.file.filename,
                admin_category: req.body.admin,
                adult: req.body.mayor
                
                

            };

            console.log(nuevoUsuario);
            db.Pelicula.create(
                nuevoUsuario)
            .then(()=>{
                res.redirect('signin')
            });

            //usuarios.push(nuevoUsuario);

            //fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, ' '));


            
        } else {
            //console.log(errores);
            res.render('signupv2', { errores: errores, old: req.body });
        }


    },

    shoppingcart: (req, res) => {
        res.render('shopping-cart')
    },

    perfil: (req, res) => {
        res.render('profile')
    },

    addProduct: (req, res) => {
        db.Brand.findAll()
        .then((brands)=>{
        
        res.render('product-add-form v3',{brands:brands})
        })
        .catch((error)=>{
            console.log(error);
            res.send(500);
        });
        // modificar form segun nuevo SQL
    },

    store: (req, res) => {
        // modificar con sequilize y nueva estructure SQL
        console.log(req.body);
        console.log(req.files);

        db.Product.create(
            {

                
                name_product: req.body.name,
                category: req.body.category,
                brand_id: req.body.brand,
                description_product: req.body.description,
                year_created: Number(req.body.year),
                features_style: req.body.features_style,
                features_gender: req.body.features_style,
                features_use: req.body.features_style,
                features_others: req.body.features_style,
                regular_price: Number(req.body.regularPrice),
                special_price: Number(req.body.specialPrice),
                returnable: req.body.devolucion == 1? 1 : 0,
                delivery_time: req.body.delivery_time,
                weight_package: Number(req.body.weight_package),
                color_available: req.body.color_available,
                size_available: req.body.size_available,
                image_main: req.file["images-main"].filename,
                image_front: req.file["images-front"] ? req.file["images-front"].filename : "",
                image_back: req.file["images-back"] ? req.file["images-back"].filename : ""
             
            } 
         ).then(function(){
             db.Product.findAll({
                include:[{association:'Brand'}],
                //order:[['rating','DESC']]
         })})
         .then((products)=>{
             res.render('productSearch',products)
         })

        //Procesando características -----------------------------------
        // let caracteristicas_req = [req.body.caract_1, req.body.caract_2, req.body.caract_3, req.body.caract_4];
        // let caracteristicas_def = []

        // caracteristicas_req.forEach(caracteristica => {
        //     if (typeof(caracteristica) != "undefined") {
        //         caracteristicas_def.push(caracteristica);
        //     }
        // });

        //Procesando talles --------------------------------------------
        // let talles_req = [
        //     typeof(req.body.small) != "undefined" ? "Small" : "",
        //     typeof(req.body.medium) != "undefined" ? "Medium" : "",
        //     typeof(req.body.large) != "undefined" ? "Large" : "",
        //     typeof(req.body.extralarge) != "undefined" ? "Extra-Large" : ""
        // ];
        // let talles_def = [];
        // talles_req.forEach(talle => {
        //     if (talle !== '') {
        //         talles_def.push(talle);
        //     }
        // })

        // const nuevoProducto = {
        //     // modificar con sequilize y nueva estructure SQL
        //     id: products[products.length - 1].id + 1, // le crea un id 1 mas alto que el del ultimo
        //     name: req.body.name ? req.body.name : "",
        //     brand: req.body.brand ? req.body.brand : "",
        //     description: req.body.description ? req.body.description : "",
        //     caracteristicas: caracteristicas_def,
        //     detalle: req.body.detalle ? req.body.detalle : "",
        //     talles: talles_def,
        //     regularPrice: Number(req.body.regularPrice) ? "$ " + req.body.regularPrice : "",
        //     specialPrice: Number(req.body.specialPrice) ? "$ " + req.body.specialPrice : "",
        //     cuotas: {
        //         banco: req.body.cuotasbanco ? req.body.cuotasbanco : "",
        //         cantidad: req.body.cuotas ? req.body.cuotas : 0
        //     },
        //     caption: req.body.caption ? req.body.caption : "",
        //     inventario: {
        //         disponibilidad: req.body.disponibilidad ? req.body.disponibilidad : 0,
        //         peso_paq: req.body.peso_paq ? req.body.peso_paq : 0,
        //         devolucion: req.body.devolucion ? req.body.devolucion : "",
        //         tiempoEntrega: req.body.tiempoEntrega ? req.body.tiempoEntrega : ""
        //     },
        //     rating: {
        //         value: req.body.rating ? Number(req.body.rating) : 0,
        //         quantity: req.body.quantity ? req.body.quantity : 0
        //     }, // le agrega todo lo del formulario excepto el file
        //     images: {
        //         main: req.files["images-main"] ? req.files["images-main"][0].filename : null,
        //         front: req.files["images-front"] ? req.files["images-front"][0].filename : null,
        //         back: req.files["images-back"] ? req.files["images-back"][0].filename : null
        //     } //le agrega los files que uploade, si lo hice, sino mantengo el anterior
        // };
        // console.log(nuevoProducto);
        // products.push(nuevoProducto);

        // fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));


        // res.redirect('/');

        //res.send('se creo producto');
    },

    admin: (req, res) => {
        db.Product.findAll({
            //order:[['rating','DESC']],
            include:[{association:'Brand'}]
        }).then((products)=>{
            res.render('admin',{products, resultsPerPage: 12 })
        })
        .catch((error)=>{
            console.log(error);
            res.sendStatus(500);
        });

        // res.render('admin', { products, resultsPerPage: 12 })
    },

    pre_edit: (req, res) => {
        const id = req.params.id;
        db.Product.findByPk(id)({
            include:[{association:'Brand'}]
        })
        .then((productToEdit)=>{
            res.render('product-pre-edit v3', productToEdit);
        })
        .catch((error)=>{
            console.log(error);
            res.send(500);
        });
        
        // modificar form con nueva estructure SQL
        //const productToEdit = products.find((prod) => prod.id == req.params.id);
        //res.render('product-pre-edit', { productToEdit })
    },

    editProduct: (req, res) => {
        const id = req.params.id;
        let productToEdit = db.Product.findByPk(id)({
            include:[{association:'Brand'}]
        });
        let brandsAvailable = db.Brand.findAll()

        Promise.all([productToEdit,brandsAvailable])
        .then(function([productToEdit, brands]){
            res.render('product-edit-form v3', {productToEdit:productToEdit,brands:brands});
        })
        .catch((error)=>{
            console.log(error);
            res.send(500);
        });
        
        // modificar form con nueva estructure SQL
        //const productToEdit = products.find((prod) => prod.id == req.params.id);
        //res.render('product-edit-form v2', { productToEdit })
    },

    update: (req, res) => {
    const id = req.params.id;
            db.Product.update(
                {
                    
                    name_product: req.body.name,
                    category: req.body.category,
                    brand_id: req.body.brand,
                    description_product: req.body.description,
                    year_created: Number(req.body.year),
                    features_style: req.body.features_style,
                    features_gender: req.body.features_gender,
                    features_use: req.body.features_use,
                    features_others: req.body.features_others,
                    regular_price: Number(req.body.regularPrice),
                    special_price: Number(req.body.specialPrice),
                    returnable: req.body.devolucion == 1? 1 : 0,
                    delivery_time: req.body.delivery_time,
                    weight_package: Number(req.body.weight_package),
                    color_available: req.body.color_available,
                    size_available: req.body.size_available,
                    image_main: req.file["images-main"].filename,
                    image_front: req.file["images-front"] ? req.file["images-front"].filename :"",
                    image_back: req.file["images-back"] ? req.file["images-back"].filename : ""
                 
                } ,
                {where:{id :id}}
             )
            
             .then(function(){  
                res.redirect('/product/' + req.params.id)
            })
            .catch((error) => {
                console.log(error);
                res.send(500);
            });


        // modificar con sequilize y nueva estructure SQL

        // const productIndex = products.findIndex((producto) => {
        //     return (producto.id == req.params.id)

        // });

        //console.log(req.files);
        //console.log(req.body);
        // const productToEdit = products.find((prod) => prod.id == req.params.id);

        //Procesando características -----------------------------------
        // if (productToEdit.caracteristicas == "") {
        //     productToEdit.caracteristicas = ["", "", "", ""];
        // }

        // let caracteristicas_original = [req.body.caract_1 ? req.body.caract_1 : productToEdit.caracteristicas[0], req.body.caract_2 ? req.body.caract_2 : productToEdit.caracteristicas[1], req.body.caract_3 ? req.body.caract_3 : productToEdit.caracteristicas[2], req.body.caract_4 ? req.body.caract_4 : productToEdit.caracteristicas[3]];
        // let caracteristicas_def = []
        //     //console.log(caracteristicas_original);
        // let i = 0;
        // for (let carac in caracteristicas_original) {
        //     if (caracteristicas_original[carac] != "") {
        //         caracteristicas_def.push(caracteristicas_original[carac]);
        //         i++;
        //     }
        // }
        // console.log(caracteristicas_def);
        // if (i = 0) {
        //     caracteristicas_def = "";
        // }

        //Procesando talles --------------------------------------------
        // let talles_req = [
        //     typeof(req.body.small) != "undefined" ? "Small" : "",
        //     typeof(req.body.medium) != "undefined" ? "Medium" : "",
        //     typeof(req.body.large) != "undefined" ? "Large" : "",
        //     typeof(req.body.extralarge) != "undefined" ? "Extra-Large" : ""
        // ];
        // let talles_def = [];
        // talles_req.forEach(talle => {
        //     if (talle !== '') {
        //         talles_def.push(talle);
        //     }
        // })

        // const productoEditado = {
        //     id: products[productIndex].id,
        //     category: req.body.category ? req.body.category : productToEdit.category,
        //     name_product: req.body.name ? req.body.name : productToEdit.name_product,
        //     brand: req.body.brand ? req.body.brand : productToEdit.brand,
        //     description_product: req.body.description ? req.body.description : productToEdit.description_product,
        //     year_created: req.body.year ? req.body.year : productToEdit.year_created,
        //     caracteristicas: caracteristicas_def,
        //     detalle: req.body.detalle ? req.body.detalle : productToEdit.detalle,
        //     talles: talles_def,
        //     regularPrice: Number(req.body.regularPrice) ? "$ " + req.body.regularPrice : productToEdit.regularPrice,
        //     specialPrice: Number(req.body.specialPrice) ? "$ " + req.body.specialPrice : productToEdit.specialPrice,
        //     cuotas: {
        //         banco: req.body.cuotasbanco ? req.body.cuotasbanco : productToEdit.cuotas.banco,
        //         cantidad: req.body.cuotas ? req.body.cuotas : productToEdit.cuotas.cantidad
        //     },
        //     caption: req.body.caption ? req.body.caption : productToEdit.caption,
        //     inventario: {
        //         disponibilidad: req.body.disponibilidad ? req.body.disponibilidad : productToEdit.inventario.disponibilidad,
        //         peso_paq: req.body.peso_paq ? req.body.peso_paq : productToEdit.inventario.peso_paq,
        //         devolucion: req.body.devolucion ? req.body.devolucion : productToEdit.inventario.devolucion,
        //         tiempoEntrega: req.body.tiempoEntrega ? req.body.tiempoEntrega : productToEdit.inventario.tiempoEntrega
        //     },
        //     rating: {
        //         value: req.body.rating ? Number(req.body.rating) : productToEdit.rating.value,
        //         quantity: req.body.quantity ? req.body.quantity : productToEdit.rating.quantity
        //     }, // le agrega todo lo del formulario excepto el file
        //     images: {
        //         main: req.files["images-main"] ? req.files["images-main"][0].filename : productToEdit.images.main,
        //         front: req.files["images-front"] ? req.files["images-front"][0].filename : productToEdit.images.front,
        //         back: req.files["images-back"] ? req.files["images-back"][0].filename : productToEdit.images.back
        //     } //le agrega los files que uploade, si lo hice, sino mantengo el anterior
        // };

        //console.log(productoEditado);

        // products[productIndex] = productoEditado;

        // fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));


        // res.redirect('/');




    },

    // Delete - Delete one product from DB
    destroy: (req, res) => {
        const id = req.params.id;
                db.Product.destroy(
                
                    {where:{id :id}}
                 )
                
                 .then(function(){
                    
                    res.redirect('/')
                })
                .catch((error)=>{
                    console.log(error);
                    res.send(500);
                });
        
        
        
        // // modificar con sequilize 
        // console.log("llegamos al destroy");



        // const productIndex = products.findIndex((producto) => {
        //     return (producto.id == req.params.id)

        // });

        // console.log(productIndex);

        // // buscar el producto con ese id	

        // products.splice(productIndex, 1);

        // fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));


        // res.redirect('/')


    },

    checkCart: (req, res) => {
        res.render('cart v2', { cart_basket, products, user: 2 });
    },

    check: (req, res) => {
        console.log("ejecutando check");
        console.log("almacenado en session:")
        console.log(req.session.usuario);
        if (req.session.usuario != undefined) {
            res.send("estas logueado");
        } else {
            res.send("no estás logueado");
        }
    },

    logout: (req, res) => {
        req.session.destroy(null);
        res.clearCookie('usuarioRecordado');
        res.redirect('/');
    },

    aboutUs: (req, res) => {
        res.render('aboutUs');
    },

    account: (req, res) => {
        res.render('account');
    },

    faq: (req, res) => {
        res.render('faq');
    },
    test: (req, res) => {
        db.Shopping_cart_content.findAll().then((result) => {
            res.send(result)
        })
    }

};

// Acá exportamos el resultado

module.exports = mainController;