const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('./public'));

app.get('/', (req, res) => {
    const archivo = path.join(__dirname, './views/product.html')
    res.sendFile(archivo);
});

app.listen(3000, () => {
    console.log("Servidor corriendo");
});
