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
        productos = 
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

		const nuevoProducto = {
		
			id : products[products.length-1].id + 1, // le crea un id 1 mas alto que el del ultimo
			...req.body, // le agrega todo lo del formulario excepto el file
			images:{main: req.file? req.file.filename : ''}, //le agrega el file que uploaded
			};
		
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

		const productoEditado = {
			id: products[productIndex].id,
			name: req.body.name,
            brand: req.body.brand,
            description: req.body.description,
            carcteristica: req.body.carcteristica,
            detalle: req.body.detalle,
            talles: req.body.talles,
			regularPrice: Number(req.body.regularPrice),
			specialPrice: Number(req.body.specialPrice),
			cuotas:{banco: req.body.cuotas-banco, cantidad: req.body.cuotas},
            caption: Number(req.body.caption),
            inventario:{disponibilidad: req.body.disponibilidad,peso_paq: req.body.peso_paq},
			rating:{value: req.body.rating,quantity: req.body.quantity},
            
			images:{main: req.file? req.file.filename : products[productIndex].image} //le agrega el file que uploade, si lo hice, sino mantengo el anterior
			};
		
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