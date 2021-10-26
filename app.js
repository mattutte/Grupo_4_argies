const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');

app.set('views','./views');

app.use(express.static('public'));

app.use(express.urlencoded());

//const mainController = require('./controllers/mainController');

const mainRouter = require('./routes/mainRouter');



app.use('/',mainRouter); 


app.listen(3000, () => {
    console.log("Servidor corriendo");
});
