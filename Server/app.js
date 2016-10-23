var app = require("express")();
var bodyParser = require("body-parser");
var bookController = require("./controllers/book");
var data = require("./models/book");
var express = require("express");
var app = express();
var pool = require("./db/db");

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/lists", function(req, res, next){
	var sql = "SELECT * FROM list_test";
	pool.query(sql, function(error, result){
		if (error) throw error;
		console.log("--BOOK TABLE--", result);
		res.json(result);
	});
});

//get danh sach san bay di
app.get("/api/sanbaydi", function(req, res, next){
    var sql = "SELECT DISTINCT noidi FROM airlinereservation.flight";
    pool.query(sql, function(error, result){
        if (error) throw error;
        console.log("--BOOK TABLE--", result);
        res.json(result);
    });
});

//get danh sach san bay den dua vao san bay di
app.get("/api/sanbayden/:sanbaydi", function(req, res, next){
    console.log(req.params.sanbaydi.toString());
    var sql = "SELECT DISTINCT noiden FROM airlinereservation.flight WHERE noidi = ?";
    pool.query(sql, req.params.sanbaydi,function(error, result){
        if (error) throw error;
        console.log("--BOOK TABLE--", result);
        res.json(result);
    });
});




app.route('/books')
    .get(bookController.getAll)
    .post(bookController.create)
    .put()
    .delete();

app.route('/books/:id')
    .get(bookController.getOne)
    .post()
    .put(bookController.update)
    .delete(bookController.delete);

app.route('/abc')
    .get(bookController.getOne)
    .post()
    .put()
    .delete();

app.listen(3333);