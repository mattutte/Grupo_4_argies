const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

app.get('/', (req, res) => {
    const archivo = path.join(__dirname, './views/home.html')
    res.sendFile(archivo);
});

app.get('/signup', (req, res) => {
    const archivo = path.join(__dirname, './views/signup.html')
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
