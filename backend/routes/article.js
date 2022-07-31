'use strict'

var express = require("express");

var ArticleController = require("../controllers/article");

var router = express.Router();

var multiparty = require("connect-multiparty");
var md_upload = multiparty({uploadDir: "./upload/articles"});

router.post("/datos-curso",ArticleController.datosCurso);
router.get("/test",ArticleController.test);
router.post("/save",ArticleController.save);
router.get("/articles/:last?",ArticleController.getArticles);
router.get("/article/:id", ArticleController.getArticle);
router.put("/article/:id", ArticleController.update);
router.delete("/delete/:id", ArticleController.delete);
router.post("/upload-image/:id?", md_upload, ArticleController.upload);
router.get("/get-image/:image",ArticleController.getImage);
router.get("/search/:search",ArticleController.search);

module.exports = router