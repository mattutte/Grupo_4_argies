// Acá nos falta nuestra fuente de datos

const products = require('../Data/products.json');

// Acá nos falta un objeto literal con las acciones para cada ruta
let mainController = {
    home: (req,res)=>{
        res.render('home')
    },
    product: (req,res)=>{
        res.render('product', {products})
    },
    productSearch: (req,res)=>{
        productos = 
        res.render('productSearch', {products})
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

};

// Acá exportamos el resultado

module.exports= mainController;