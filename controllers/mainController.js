const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));// pasa el json a un array

//const products = require('../Data/products.json');

// Acá nos falta un objeto literal con las acciones para cada ruta
let mainController = {
    home: (req,res)=>{
        res.render('home',products)
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
        res.render('signup')
    },
    
    shoppingcart: (req,res)=>{
        res.render('shopping-cart')
    },
    
    perfil: (req,res)=>{
        res.render('profile')
    },
    
    addProduct: (req,res)=>{
        res.render('product-add-form')
    },
    
    store: (req, res) => {
        console.log(req.body);
        console.log(req.files);
		const nuevoProducto = {
		
			id : products[products.length-1].id + 1, // le crea un id 1 mas alto que el del ultimo
			name: req.body.name? req.body.name : "",
            brand: req.body.brand? req.body.brand : "",
            description: req.body.description? req.body.name : "",
            carcteristica: req.body.carcteristica? req.body.carcteristica : "",
            detalle: req.body.detalle? req.body.detalle : "",
            talles: req.body.small.length == 0 &&
                     req.body.medium.length == 0 && 
                     req.body.large.length == 0 &&
                     req.body.extralarge.length == 0? []:[req.body.small, req.body.medium, req.body.large, req.body.extralarge] ,
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
        res.render('product-edit-form',{productToEdit})
    },
    
    update: (req, res) => {
		const productIndex = products.findIndex((producto)=>{
			return (producto.id == req.params.id)
			
		});

        console.log(req.files);
        const productToEdit = products.find((prod) => prod.id == req.params.id); 
        

		const productoEditado = {
			id: products[productIndex].id,
			name: req.body.name? req.body.name : "",
            brand: req.body.brand? req.body.brand : "",
            description: req.body.description? req.body.name : "",
            carcteristica: req.body.carcteristica? req.body.carcteristica : "",
            detalle: req.body.detalle? req.body.detalle : "",
            talles: req.body.small.length == 0 &&
                     req.body.medium.length == 0 && 
                     req.body.large.length == 0 &&
                     req.body.extralarge.length == 0? []:[req.body.small, req.body.medium, req.body.large, req.body.extralarge] ,
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
            images:{main: req.files["images-main"]? req.files["images-main"][0].filename : productToEdit.images.main,
                        front: req.files["images-front"]? req.files["images-front"][0].filename  : productToEdit.images.front,
                        back: req.files["images-back"]? req.files["images-back"][0].filename  : productToEdit.images.back 
                    } //le agrega los files que uploade, si lo hice, sino mantengo el anterior
			};
		
			console.log(productoEditado);
            
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
		
		
	}

};

// Acá exportamos el resultado

module.exports= mainController;