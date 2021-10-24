const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

app.use(express.urlencoded());

app.get('/', (req, res) => {
    const archivo = path.join(__dirname, './views/home.html')
    res.sendFile(archivo);
});

app.get('/frame', (req,res) =>{
    res.sendFile(path.join(__dirname,'/views/frame.html'))
})

app.get('/product', (req,res) =>{
    res.sendFile(path.join(__dirname,'/views/productv2.html'))
})

app.get('/shopping-cart', (req,res) =>{
    res.sendFile(path.join(__dirname,'/views/shopping-cart.html'))
})

app.get('/signup', (req, res) => {
    const archivo = path.join(__dirname, './views/signup.html')
    res.sendFile(archivo);
});

app.get('/productSearch', (req, res) => {
    const archivo = path.join(__dirname, './views/productSearch.html')
    res.sendFile(archivo);
});

app.post('/signup', (req, res) => {
    req.body;
    res.redirect('/');
});

app.get('/signin', (req, res) => {
    const archivo = path.join(__dirname, './views/signin.html')
    res.sendFile(archivo);
});
app.listen(3000, () => {
    console.log("Servidor corriendo");
});
