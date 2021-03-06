/**
 * Created by 19872406 on 25/10/2016.
 */
var express   =    require("express");
var router = express.Router();
var mysql     =    require('mysql');
var randomstring = require("randomstring");

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'null',
    database : 'airlinereservation',
    debug    :  false
});

function handle_database(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        var madatcho = randomstring.generate(6).toUpperCase(); ;
        var datetime = new Date();
        var post  = {Ma: madatcho, Thoigiandatcho: datetime,Tongtien:0, Trangthai:0};

        connection.query("insert into bookings set?",post,function(err,rows){
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

router.get("/",function(req,res){
    handle_database(req,res);
});

module.exports = router;