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
            console.log(req.session.loggedin)
            res.render('home',{products})
        })
        .catch((error)=>{
            console.log(error);
            res.sendStatus(500);
        });

        // modificar con sequilize
        //console.log('entré al home');
        //res.render('home', { products })
    },

    product: (req, res) => {

        const id = req.params.id;

        var products = db.Product.findAll({
            //order:[['rating','DESC']],
            include:[{association:'Brand'}]
        })

        var product = db.Product.findByPk(id,{
            include:[{association:'Brand'}]
        })

        Promise.all([products, product])
        .then(function([products, product]){
            res.render('product', {products, product});
        })
        .catch((error)=>{
            console.log(error);
            res.sendStatus(500);
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
        });
        //modificar con sequilize 
        //res.render('productSearch', { products, resultsPerPage: 12 })
    },

    signin: (req, res) => {
        res.render('signin')
    },

    checksignin: (req, res) => {
/*
        const usuarioCheckIn = usuarios.find((usuario) => usuario.email == req.body.email);
        console.log(usuarioCheckIn);
        */

        const errorMessage = 'el email o el password no coinciden con nuestros registros';

        db.User.findOne({
            where: {
                email: req.body.email,
            }
        }).then((foundUser) => {
            if(!foundUser) {
                res.render('signin', { errorMessage });
            }else{
                console.log("encontró usuario")
                //let emailUsuario = usuarioCheckIn.email;
                const passwordEncriptadaUsuario = foundUser.passwd;
                console.log(passwordEncriptadaUsuario);
                const bcrypt = require('bcryptjs');
                const check = bcrypt.compareSync(req.body.psw, passwordEncriptadaUsuario);
                //console.log(check);

                if(check){
                    req.session.usuario = foundUser.email;
                    req.session.admin = foundUser.admin_category;
                    req.session.loggedin = true;
                    req.session.save();
                    if (req.body.remember != undefined) {
                        console.group("se seleccionó opcion de mantener sesion");
                        res.cookie('usuarioRecordado', foundUser.email, { maxAge: 1800000 }); //Duracion de cookie: 30 minutos
                    }
                    return res.redirect('/');
                } else {
                    res.render('signin', { errorMessage });
                }
            }
            req.session.save();
        });

        /*
        if (usuarioCheckIn) { //usuario existe (está registrado)
            //let emailUsuario = usuarioCheckIn.email;
            const passwordEncriptadaUsuario = usuarioCheckIn.passwd;
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
        */

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

        console.log(req.body);
        console.log(req.file);


        if (errores.isEmpty()) {



            const bcrypt = require('bcryptjs');
            const passEncriptada = bcrypt.hashSync(req.body.psw, 10);

            const nuevoUsuario = {

                //id: usuarios[usuarios.length - 1].id + 1, // le crea un id 1 mas alto que el del ultimo
                email: req.body.email,
                passwd: passEncriptada,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                country: req.body.pais,
                face_pic: req.file.filename,
                admin_category: req.body.admin == 'on'? 1 : 0,
                adult: req.body.mayor == 'on'? 1 : 0,
                
                

            };

            console.log(nuevoUsuario);
            db.User.create(
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

    // editProfile: (req,res){
    //     const id = req.params.id;
    //     db.User.findByPk(id)
    //     .then((user)=>{
    //         res.render('profilev2', user);
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //         res.send(500);
    //     });
    // },

    // updateProfile: (req, res){

    // },

    shoppingcart: (req, res) => {
        res.render('shopping-cart')
    },

    perfil: (req, res) => {
        res.render('profile')
    },

    addProduct: (req, res) => {
        db.Brand.findAll()
        
        
        .then((brands)=>{
            console.log(req.body);
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
        console.log(Number(req.body.weight_package));

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
                returnable: req.body.devolucion == 'on'? 1 : 0,
                delivery_time: req.body.delivery_time,
                weight_package: Number(req.body.weight_package),
                color_available: req.body.color_available,
                size_available: req.body.size_available,
                image_main: req.files.find(file=>file.fieldname == "image-main").filename,
                image_front: req.files.find(file=>file.fieldname == "image-front") ? req.files.find(file=>file.fieldname == "image-front").filename : "",
                image_back: req.files.find(file=>file.fieldname == "image-back") ? req.files.find(file=>file.fieldname == "image-back").filename : ""
             
            } 
         )
         .then(function(){  
            res.redirect('/')
        })
        .catch((error) => {
            console.log(error);
            res.send(500);
        });

        
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
        db.Product.findByPk(id,{
            include:[{association:'Brand'}]
        })
        .then((productToEdit)=>{
            res.render('product-pre-edit v3', {productToEdit});
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
        let productToEdit = db.Product.findByPk(id,{
            include:[{association:'Brand'}]
        });
        let brands = db.Brand.findAll();

        console.log(productToEdit);
        console.log(brands.name_brand);

        Promise.all([productToEdit,brands])
        .then(function([productToEdit, brands]){
            res.render('product-edit-form v3', {productToEdit:productToEdit,brands:brands});
        })
        .catch((error)=>{
            console.log(error);
            res.send(500);
        });
        
        
    },

    update: (req, res) => {
            const id = req.params.id;
            console.log(req.body);
            console.log(req.file);
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
                    returnable: req.body.devolucion == 'on'? 1 : 0,
                    delivery_time: req.body.delivery_time,
                    weight_package: Number(req.body.weight_package),
                    color_available: req.body.color_available,
                    size_available: req.body.size_available,
                    image_main: req.files.find(file=>file.fieldname == "image-main") ? req.files.find(file=>file.fieldname == "image-main").filename : req.body.image_main,
                    image_front: req.files.find(file=>file.fieldname == "image-front") ? req.files.find(file=>file.fieldname == "image-front").filename : req.body.image_front,
                    image_back: req.files.find(file=>file.fieldname == "image-back") ? req.files.find(file=>file.fieldname == "image-back").filename : req.body.image_back,
                 
                } ,
                {where:{id :id}}
             )
            
             .then(function(){  
                res.redirect('/')
            })
            .catch((error) => {
                console.log(error);
                res.send(500);
            });

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
        db.User.findOne({
            where: {
                email: req.session.usuario,
            }
        }).then((foundUser) => {
            res.render('account', {user: foundUser});
        })
        .catch((error)=>{
            console.log(error);
            res.sendStatus(500);
        });
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