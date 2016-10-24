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

        var npassengers = 'select COUNT(*) AS namesCount from passengers where Madatcho = ?';
        var madatcho = req.params.Madatcho;
        var datetime = new Date();

        connection.query(npassengers, [madatcho], function(err, row1) {
            if (err) throw err;
            var tongtien = row1[0].namesCount;
            connection.query("select Madatcho = ?, sum(Giaban) as A from flightdetail group by Madatcho", [madatcho], function (err, row2) {
                if (!err) {
                    tongtien *= row2[0].A;
                    var post = {Ma: madatcho, Thoigiandatcho: datetime, Tongtien: tongtien, Trangthai: 1};
                    connection.query("update bookings set ? where Ma = ?", [post, madatcho], function (err, rows) {
                        connection.release();
                        if (!err) {
                            res.json(rows);
                        }
                    });
                }
            });
        });

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
    });
}

router.get("/:Madatcho",function(req,res){
    handle_database(req,res);
});

module.exports = router;