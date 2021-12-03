const fs = require('fs');
const path = require('path');
const { response } = require("express")
const { validationResult } = require("express-validator")

const productsFilePath = path.join(__dirname, '../data/products.json');
const usuariosFilePath = path.join(__dirname, '../data/users/users.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));// pasa el json a un array
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));// pasa el json a un array
const basketFilePath = path.join(__dirname, '../data/shopping-cart.json');
const cart_basket = JSON.parse(fs.readFileSync(basketFilePath, 'utf-8'));

//const products = require('../Data/products.json');

// Acá nos falta un objeto literal con las acciones para cada ruta
let mainController = {
    home: (req,res)=>{
        res.render('home',{products})
    },
    
    product: (req,res)=>{
        const product = products.find((prod) => prod.id == req.params.id);
        
        res.render('product', {products, product})
    },
    
    productSearch: (req,res)=>{
        //productos = 
        res.render('productSearch', {products, resultsPerPage: 12})
    },
    
    signin: (req,res)=>{
        res.render('signin')
    },
    
    signup: (req,res)=>{
        res.render('signupv2')
    },

    crearperfil: (req,res)=>{
        console.log(req.body);
        console.log(req.file);

        var response = req.body
        var errors = validationResult(req).mapped()

        console.log(errors);

        const bcrypt = require('bcryptjs');
	    const passEncriptada = bcrypt.hashSync(req.body.psw, 10);

        const nuevoUsuario = {
		
			id : usuarios[usuarios.length-1].id + 1, // le crea un id 1 mas alto que el del ultimo
			email: req.body.email,
            password: passEncriptada,
            direccion: req.body.description? req.body.description : "",
            pais: req.body.pais,
            seleccionFavorita: req.body.detalle? req.body.detalle : "",
            equipoLocFav:req.body.detalle? req.body.detalle : "",
            mayor: req.body.detalle? true : false,
            images: req.file.filename,
                         
        }

        console.log(nuevoUsuario);
		usuarios.push(nuevoUsuario);

		fs.writeFileSync(usuariosFilePath,JSON.stringify(usuarios,null,' '));
		

		res.redirect('/');

        //res.render('perfilv2')
    },
    
    shoppingcart: (req,res)=>{
        res.render('shopping-cart')
    },
    
    perfil: (req,res)=>{
        res.render('profile')
    },
    
    addProduct: (req,res)=>{
        res.render('product-add-form v2')
    },
    
    store: (req, res) => {
        console.log(req.body);
        console.log(req.files);

        //Procesando características -----------------------------------
        let caracteristicas_req = [req.body.caract_1, req.body.caract_2, req.body.caract_3, req.body.caract_4];
        let caracteristicas_def = []

        caracteristicas_req.forEach(caracteristica => {
            if (typeof(caracteristica)!="undefined"){
                caracteristicas_def.push(caracteristica);
            }
        });

        //Procesando talles --------------------------------------------
        let talles_req = [
            typeof(req.body.small) !="undefined"? "Small" : "", 
            typeof(req.body.medium) !="undefined"? "Medium" : "",
            typeof(req.body.large) !="undefined"? "Large" : "",
            typeof(req.body.extralarge) !="undefined"? "Extra-Large" : ""];
        let talles_def = [];
        talles_req.forEach(talle => {
            if (talle !== ''){
                talles_def.push(talle);
            }
        })

		const nuevoProducto = {
		
			id : products[products.length-1].id + 1, // le crea un id 1 mas alto que el del ultimo
			name: req.body.name? req.body.name : "",
            brand: req.body.brand? req.body.brand : "",
            description: req.body.description? req.body.description : "",
            caracteristicas: caracteristicas_def,
            detalle: req.body.detalle? req.body.detalle : "",
            talles: talles_def,
			regularPrice: Number(req.body.regularPrice)? "$ " + req.body.regularPrice:"",
			specialPrice: Number(req.body.specialPrice)? "$ " + req.body.specialPrice: "",
			cuotas:{banco: req.body.cuotasbanco? req.body.cuotasbanco:"", 
                    cantidad: req.body.cuotas? req.body.cuotas:0},
            caption: req.body.caption? req.body.caption: "",
            inventario:{disponibilidad: req.body.disponibilidad? req.body.disponibilidad:0,
                        peso_paq: req.body.peso_paq? req.body.peso_paq:0,
                        devolucion: req.body.devolucion? req.body.devolucion:"", 
                        tiempoEntrega: req.body.tiempoEntrega? req.body.tiempoEntrega:""},
			rating:{value: req.body.rating? Number(req.body.rating):0,
                    quantity: req.body.quantity? req.body.quantity:0}, // le agrega todo lo del formulario excepto el file
            images:{main: req.files["images-main"]? req.files["images-main"][0].filename : null,
                        front: req.files["images-front"]? req.files["images-front"][0].filename : null,
                        back: req.files["images-back"]? req.files["images-back"][0].filename : null 
                    } //le agrega los files que uploade, si lo hice, sino mantengo el anterior
			};
		console.log(nuevoProducto);
		products.push(nuevoProducto);

		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,' '));
		

		res.redirect('/');
		
		//res.send('se creo producto');
	},
    
    admin: (req,res)=>{
        res.render('admin',{products, resultsPerPage: 12})
    },
    
    pre_edit: (req,res)=>{
        const productToEdit = products.find((prod) => prod.id == req.params.id);
        
        res.render('product-pre-edit',{productToEdit})
    },
    
    editProduct: (req,res)=>{
        const productToEdit = products.find((prod) => prod.id == req.params.id);
        res.render('product-edit-form v2',{productToEdit})
    },
    
    update: (req, res) => {
		const productIndex = products.findIndex((producto)=>{
			return (producto.id == req.params.id)
			
		});

        //console.log(req.files);
        //console.log(req.body);
        const productToEdit = products.find((prod) => prod.id == req.params.id); 
        
        //Procesando características -----------------------------------
            if (productToEdit.caracteristicas == ""){
                productToEdit.caracteristicas = ["", "", "", ""];
            }

            let caracteristicas_original = [req.body.caract_1? req.body.caract_1 : productToEdit.caracteristicas[0],req.body.caract_2? req.body.caract_2 : productToEdit.caracteristicas[1],req.body.caract_3? req.body.caract_3 : productToEdit.caracteristicas[2],req.body.caract_4? req.body.caract_4 : productToEdit.caracteristicas[3]];
            let caracteristicas_def = []
            //console.log(caracteristicas_original);
            let i = 0;
            for (let carac in caracteristicas_original) {
                if (caracteristicas_original[carac]!=""){
                    caracteristicas_def.push(caracteristicas_original[carac]);
                    i++;
                }
            }
            console.log(caracteristicas_def);
            if (i=0){
                caracteristicas_def = "";
            }

        //Procesando talles --------------------------------------------
            let talles_req = [
                typeof(req.body.small) !="undefined"? "Small" : "", 
                typeof(req.body.medium) !="undefined"? "Medium" : "",
                typeof(req.body.large) !="undefined"? "Large" : "",
                typeof(req.body.extralarge) !="undefined"? "Extra-Large" : ""];
            let talles_def = [];
            talles_req.forEach(talle => {
                if (talle !== ''){
                    talles_def.push(talle);
                }
            })

		const productoEditado = {
			id: products[productIndex].id,
			name: req.body.name? req.body.name : productToEdit.name,
            brand: req.body.brand? req.body.brand : productToEdit.brand,
            description: req.body.description? req.body.description : productToEdit.description,
            caracteristicas: caracteristicas_def,
            detalle: req.body.detalle? req.body.detalle : productToEdit.detalle,
            talles: talles_def,
			regularPrice: Number(req.body.regularPrice)? "$ " + req.body.regularPrice: productToEdit.regularPrice,
			specialPrice: Number(req.body.specialPrice)? "$ " + req.body.specialPrice: productToEdit.specialPrice,
			cuotas:{banco: req.body.cuotasbanco? req.body.cuotasbanco:productToEdit.cuotas.banco, 
                    cantidad: req.body.cuotas? req.body.cuotas:productToEdit.cuotas.cantidad},
            caption: req.body.caption? req.body.caption: productToEdit.caption,
            inventario:{disponibilidad: req.body.disponibilidad? req.body.disponibilidad:productToEdit.inventario.disponibilidad,
                        peso_paq: req.body.peso_paq? req.body.peso_paq:productToEdit.inventario.peso_paq,
                        devolucion: req.body.devolucion? req.body.devolucion:productToEdit.inventario.devolucion, 
                        tiempoEntrega: req.body.tiempoEntrega? req.body.tiempoEntrega:productToEdit.inventario.tiempoEntrega},
			rating:{value: req.body.rating? Number(req.body.rating):productToEdit.rating.value,
                    quantity: req.body.quantity? req.body.quantity:productToEdit.rating.quantity}, // le agrega todo lo del formulario excepto el file
            images:{main: req.files["images-main"]? req.files["images-main"][0].filename : productToEdit.images.main,
                        front: req.files["images-front"]? req.files["images-front"][0].filename  : productToEdit.images.front,
                        back: req.files["images-back"]? req.files["images-back"][0].filename  : productToEdit.images.back 
                    } //le agrega los files que uploade, si lo hice, sino mantengo el anterior
			};
		
			//console.log(productoEditado);
            
            products[productIndex] = productoEditado;

			fs.writeFileSync(productsFilePath,JSON.stringify(products,null,' '));
		

			res.redirect('/');
		
		
		
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
        console.log("llegamos al destroy");

		

		const productIndex = products.findIndex((producto)=>{
			return (producto.id == req.params.id)
			
		});

        console.log(productIndex);
			
		// buscar el producto con ese id	
		
		products.splice(productIndex,1);

		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,' '));
		

		res.redirect('/')
		
		
	},

    checkCart: (req,res)=>{
        res.render('cart v2', {cart_basket, products, user: 2});
    }

};

// Acá exportamos el resultado

module.exports= mainController;