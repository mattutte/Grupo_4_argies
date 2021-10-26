// Acá nos falta nuestra fuente de datos

// Acá nos falta un objeto literal con las acciones para cada ruta
let mainController = {
    home: (req,res)=>{
        res.render('home')
    },
    product: (req,res)=>{
        res.render('product')
    },
    productSearch: (req,res)=>{
        res.render('productSearch')
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

};

// Acá exportamos el resultado

module.exports= mainController;