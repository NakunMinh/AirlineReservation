/**
 * Created by 19872406 on 24/10/2016.
 */
var express   =    require("express");
var mysql     =    require('mysql');
var app       =    express();
var url       = require("url");

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'null',
    database : 'airlinereservation',
    debug    :  false
});

function handle_database(req,res) {

    var start = req.toString().trim();
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("select Noiden from flights where Noidi = ?",[start],function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }
        });

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
    });
}

app.get("/flights/destinations/:Noidi",function(req,res){
    var des = req.params.Noidi;
    handle_database(des,res);
});

app.listen(3001);