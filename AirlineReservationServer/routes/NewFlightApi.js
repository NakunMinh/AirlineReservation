/**
 * Created by 19872406 on 25/10/2016.
 */
var express   =    require("express");
var router = express.Router();
var mysql     =    require('mysql');

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

        var post  = {Machuyenbay: req.params.machuyenbay,Noidi:req.params.noidi,Noiden:req.params.noiden,
                    Ngay:req.params.ngay,Gio:req.params.gio, Hang:req.params.hang,
                    Mucgia:req.params.mucgia,Soluongghe:req.params.soluong,Giaban:req.params.gia};

        connection.query("insert into flights set ?",post,function(err,rows){
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

router.get("/:machuyenbay/:noidi/:noiden/:ngay/:gio/:hang/:mucgia/:soluong/:gia",function(req,res){
    handle_database(req,res);
});

module.exports = router;
