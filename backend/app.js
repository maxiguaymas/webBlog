
// CARGAR MODULOS DE NODE PARA EL SERVIDOR 
var express = require("express");
var bodyParser = require("body-parser");

// EJECUTAR EXPRESS (HTTP)

var app = express();


// CARGAR FICHEROS RUTAS
var article_routes = require("./routes/article");

// MIDDLEWARES

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// AÑADIR PREFIJOS A RUTAS
app.use("/api",article_routes);

// EXPORTAR APP

module.exports = app;