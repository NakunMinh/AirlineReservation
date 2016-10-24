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

        var sql = "select * from flights where Noidi = ? and Noiden = ? and Ngay = ? and Soluongghe = ?";
        connection.query(sql,[req.params.noidi,req.params.noiden,req.params.ngay,req.params.soluong],function(err,rows){
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

router.get("/:noidi/:noiden/:ngay/:soluong",function(req,res){
    handle_database(req,res);
});

module.exports = router;
