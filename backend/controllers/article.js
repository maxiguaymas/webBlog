'use strict'
var validator = require("validator");

var Article = require("../models/article");

var fs = require("fs");


var path = require("path");
const { exists } = require("../models/article");



var controller = {

    datosCurso: (req,res) =>{
        let param = req.body.hola;
        return res.status(200).send({message: "Hola mundo",param});
    },
    test: (req,res) =>{
        return res.status(200).send({message: "test desde controllers"});
    },
    save: (req,res) =>{
        // recoger los parametros por post
        var params = req.body;
        // validamos los datos con validator
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(200).send({message: "Faltan datos por enviar"});
        }

        if(validate_title && validate_content){
            // crear el objeto a guardar
            var article = new Article();

            // asignar valores
            article.title = params.title;
            article.content = params.content;

            if(params.image){
                article.image = params.image;
            }
            else{
                article.image = null;
            }
            

            // guardar el articulo
            article.save((err, articleStored) =>{
                if(err || !articleStored){
                    return res.status(404).send({status: "error",message: "el articulo no se guardo correctamente"});
                };

                return res.status(200).send({
                    status: "success",
                    article: articleStored
                });
            });

            
        }
        else {
            return res.status(200).send({message: "los datos no son validos"});
        }
    },
    getArticles: (req,res) =>{
        // sacamos los ultimos articulos enviando un num como parametro opcional
        var query = Article.find({});

        var last = parseInt(req.params.last);
        
        if(last && last != undefined){
            query.limit(last);
        }

        // find   // _id: -1  es para sacar de mas nuevo a mas viejo en el array que devuelve y 1 para devovler de mas viejo a mas nuevo
        query.find({}).sort({_id: -1}).exec((err,articles_Stored) =>{ 
            if(err) res.status(500).send({status: "error",message: "error al devolver todos los articles"});
            if(!articles_Stored) res.status(404).send({status: "error",message: "no hay articulos"});

            return res.status(200).send({status: "success",articles_Stored});

        });
        
    },
    getArticle: (req, res) =>{
        // recogemos el id
        var articleId= req.params.id;
        // comprobamos que existe
        if(!articleId || articleId == null || articleId == undefined){
            return res.status(500).send({message: "no existe el articulo"});
        }

        // buscamos el articulo
        Article.findById(articleId, (err, article) =>{
            if(err || !article){
                return res.status(404).send({message: "no hay ningun articulo con esta id"});
            }
            return res.status(200).send({status : "success", article});
        })
    },
    update: (req,res) =>{
        // recogemos el id
        var articleId = req.params.id;
        // recogemos los datos que llegan por PUT
        var params = req.body;

        // validamos los datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (error) {
            return res.status(404).send({message: "ha ocurrido un error"});
        }

        if(validate_content && validate_title){
            Article.findOneAndUpdate({_id: articleId},params,{new: true}, (err,article_update) =>{
                if(err || !article_update){
                    return res.status(404).send({message: "Error al actualizar"});
                }
                return res.status(200).send({status:"success",article_update});
            })
        }
        else{
            return res.status(404).send({message: "faltan datos para actualizar"});
        }

        
    },
    delete: (req,res) => {
        // recogemos el id
        var articleId = req.params.id;

        // buscar y borrar
        Article.findOneAndDelete({_id: articleId},(err,articleDelete) =>{
            if(err) return res.status(500).send({message: "ha ocurrido un error"});
            else if(!articleDelete) return res.status(404).send({message: "no se ha encontrado el articulo"});
            return res.status(200).send({status: "success",articleDelete});
        });
    },
    upload: (req,res) => {
        // recogemos el fichero
        var file_name = "Imagen no subida...";

        if(!req.files) return res.status(404).send({message: file_name});

        // conseguir el nombre y la extension del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split("\\");

        // nombre del archivo
        file_name = file_split[2];

        // que tipo de archivo es(o extension)
        var ext_split = file_name.split("\.");
        var file_ext = ext_split[1];

        // comprobar que sean solo imagenes
        var test_img = file_ext == "png" || file_ext == "jpg" || file_ext == "jpeg" || file_ext == "gif";

        if(test_img == true){
            // si es una imagen
            var articleId = req.params.id;

            if(articleId){
                // buscamos el articulo y lo actualizamos con la imagen
                Article.findOneAndUpdate({_id: articleId},{image: file_name},{new: true},(err, article_update) =>{
                    if(err || !article_update){
                        return res.status(404).send({message: "error al guardar la imagen en el articulo"});
                    };

                    return res.status(200).send({status: "success",article_update});
                })
            }
            else{
                return res.status(200).send({status: "success",image: file_name});
            }

            // buscamos el articulo y lo actualizamos con la imagen
            Article.findOneAndUpdate({_id: articleId},{image: file_name},{new: true},(err, article_update) =>{
                if(err || !article_update){
                    return res.status(404).send({message: "error al guardar la imagen en el articulo"});
                };

                return res.status(200).send({status: "success",article_update});
            })
            
        }
        else{
            // si es distinto de img borramos el archivo
            fs.unlink(file_path,(err)=>{
                return res.status(404).send({message: "Solo se permiten imagenes"});
            });
        }
        
        
    },
    getImage: (req,res) => {
        var file = req.params.image;
        var path_file = "./upload/articles/"+ file;

        fs.exists(path_file, (exists) =>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }
            else{
                return res.status(404).send({message: "error"});
            };
        });
    },
    search: (req,res) =>{
        // sacamos el string a buscar
        var search_string = req.params.search;

        // find or
        Article.find({"$or":[
            {title: {"$regex": search_string, "$options": "i"}},
            {content: {"$regex": search_string, "$options": "i"}}
        ]})
        .sort([["date","descending"]])
        .exec((err,articles) => {
            if(err) return res.status(404).send({message: "error"});
            else if(!articles || articles.length <=0) return res.status(404).send({message: "No hay coincidencias en tu busqueda"});
            return res.status(200).send({status: "success",articles});
        });
    }
};

module.exports = controller;