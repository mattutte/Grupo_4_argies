// ************ Require's ************
//const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
//const logger = require('morgan');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

// ************ express() - (don't touch) ************
const app = express();
const session = require('express-session');
	

// ************ Middlewares - (don't touch) ************
//app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(session({secret:'nombre del sitio', resave: false, saveUninitialized: true }));
//app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas



// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************
 
const mainRouter = require('./routes/mainRouter');
app.use('/',mainRouter); 


app.use(session({secret: "cazaka"}));

app.listen(3000, () => {
    console.log("Servidor corriendo");
});


module.exports = app;
