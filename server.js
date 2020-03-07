/**
 * Created by Luis on 24/02/2020.
 */
//Express es un modulo NPM para hacer uso del framework EXPRESS este framework nos provee diferentes modulos
//para hacer el trabajo mas facil
const express = require('express');
//Iniciamos nuestra aplicación tipo NODE por medio del framework Express
const app = express();
//Requerimos las rutas del archivo routers, ahí tenemos definidos nuestros metodos get, post, delete
//y los diferentes metodos que vamos a recibir por parte del cliente
const routers = require('./routers');

const bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

//Indicamos a Express que entienda los formatos json o los objetos de javascript que lleguen del browser
//app.use(express.json());

//Settings views EJS: EJS es un motor de plantillas que nos permite dar interactividad con el cliente
//Nos permite trabajar con formatos json entre otros, su sintaxis es la siguiente: <% %>
//En este caso iniciamos una variable con la palabra clave set que nos permite iniciar una varible donde se encuentran
//nuestras vistas, __dirname es la ruta actual donde se encuentra este archivo y concatenamos la carpeta donde se
//encuentran nuestras vistas
app.set('views', __dirname + '/views');
//Indicamos el tipo de motor de plantillas a utilizar, en nuestro caso EJS
app.set('view engine', 'ejs');
//Definimos una variable con el puerto
var port = process.env.PORT || 3000;
app.set('port', port);

//Middleweres (Funciones o peticiones que se inician, luego se procesan y finalmente entregan un resultado)
/*
app.use((req,res,next) =>
{
    console.log('Ha pasado por esta función');
    next();
});
*/

//Routers: Le indicamos al framework express que use las rutas get, post para devolverle un resultado al cliente en el browser
//La palabra clave use nos permite indicarle a express que use el modulo routers para dar respuesta a las peticiones del cliente
app.use(routers);

//Iniciamos nuestro servidor  en el puerto que indiquemos
app.listen(app.get('port'), () => {
    console.log("Server OK!");
});