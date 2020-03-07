/**
 * Created by Luis on 02/03/2020.
 */
//Express es un modulo NPM para hacer uso del framework EXPRESS este framework nos provee diferentes modulos
//para hacer el trabajo mas facil
const express = require('express');
//Iniciamos una variable con el modulo Router de express para que nos permita hacer uso de las rutas get, post...
const router = express.Router();

//Rutas Express, en este caso estamos definiendo una ruta tipo get, los metodos get devuelven un resultado el cliente
router.get('/', (req, res) => {
    res.render('index.ejs',{ cost: "0", letter: "", option: 0 });
});

router.get('/lettersstamped', (req,res) => {
    res.render('lettersstamped.ejs');
});

router.get('/lettersmetered', (req,res) => {
    res.render('lettersmetered.ejs');
});

router.get('/envelopes', (req,res) => {
    res.render('envelopes.ejs');
});

router.get('/firstclasspackage', (req,res) => {
    res.render('firstclasspackage.ejs');
});

router.get('/actionletters', (req, res) => {
    var number = req.query.number;
    var letter = req.query.letter;
    console.log("NUMBER IS: "+number+" AND LETTER IS: "+letter);
    res.render('index.ejs',{ cost: "0", letter: "", option: 0 });
});

router.get('/actionfirstclasspackage', (req, res) => {
    var weight = req.query.weight;
    var zone = req.query.zone;
    var price = req.query.price;
    res.render('index.ejs',{ cost: price, letter: "First Class Package", weight: weight, zone: zone });
});

// POST /login gets urlencoded bodies
router.post('/actionletters', function (req, res) {
    //res.end(req.body);
    var obj = JSON.stringify(req.body, true, 0);
    var numberjson = JSON.parse(obj);
    var number = numberjson.number;
    var zone = numberjson.zone;
    var letter = numberjson.letter;
    var result = 0;

    if(letter == "Stamped")
    {
        switch (number) {
            case "1":
                result = "$0.55"; break;
            case "2":
                result = "$0.70"; break;
            case "3":
                result = "$0.85"; break;
            case "3.5":
                result = "$1"; break;
            default:
                result = "0"; break;
        }
    }
    else
    if(letter == "Metered")
    {
        switch (number) {
            case "1":
                result = "$0.50"; break;
            case "2":
                result = "$0.65"; break;
            case "3":
                result = "$0.80"; break;
            case "3.5":
                result = "$0.95"; break;
            default:
                result = "0"; break;
        }
    }
    else
    if(letter == "Envelopes")
    {
        switch (number) {
            case "1":
                result = "$1.00"; break;
            case "2":
                result = "$1.20"; break;
            case "3":
                result = "$1.40"; break;
            case "4":
                result = "$1.60"; break;
            case "5":
                result = "$1.80"; break;
            case "6":
                result = "$2.00"; break;
            case "7":
                result = "$2.20"; break;
            case "8":
                result = "$2.40"; break;
            case "9":
                result = "$2.60"; break;
            case "10":
                result = "$2.80"; break;
            case "11":
                result = "$3.00"; break;
            case "12":
                result = "$3.20"; break;
            case "13":
                result = "$3.40"; break;
            default:
                result = "0"; break;
        }
    }

    res.render('index.ejs',{ cost: result, letter: letter, weight: number });
    //res.end(numberjson.number);
});

/*
//Post: en este caso estamos definiendo una ruta tipo post, los metodos post reciben resultados por parte del cliente
router.post('/actionlettersstamped', (req,res) => {
    //console.log(req.body.number);
    //console.log(req.params);
    //res.send("Post execute "+req.body.number);
    //res.json(req.body);
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body.number, null, 2))
});
*/
//Esta ruta post: /testpost/:id cuando definimos :id estamos indicando a Express que obtenga un id despues de la ruta testpost/456
router.post('/testpost/:id', (req,res) => {
    //req.body Significa: cuerpo de la petición
    console.log(req.body);
    //req.params: Obtenemos el parametro id que viene de la ruta que viene despues de: testpost/:id
    console.log(req.params);
    res.send("Post execute: "+req.params.id);
});

//Esta ruta delete: /testdelete/:id cuando definimos :id estamos indicando a Express que obtenga un id despues de la ruta testdelete/456
router.delete('/testdelete/:id', (req,res) => {
    res.send("USER DELETED: "+req.params.id);
});

router.get('/testjson', (req,res) => {
    res.json({
        name: "luis",
        lastname: "Orb"
    });
});

//Finalmente si la ruta indicada en el navegador no coincide con als rutas anteriormente escriitas,
//entonces devolvemos un Not Found
router.get('*', (req,res) => {
    res.end("Not Found");
});

//Documentación de rutas: http://expressjs.com/en/4x/api.html#app.path

//Con este línea, indicamos a Express que devuelva las rutas al archivo donde es llamado para que estas puedan ser usadas
module.exports = router;