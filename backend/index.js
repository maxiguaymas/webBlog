
var mongoose = require("mongoose");
var app = require("./app");
var port = 3900;

// mongoose.set('useFindAndModify',false);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/api-master-js',{useNewUrlParser: true})
        .then(()=>{
            console.log("conexion establecida con exito..");

            // crear servidor

            app.listen(port, () =>{
                console.log("servidor corriendo en http://localhost:"+port);
            })
        });