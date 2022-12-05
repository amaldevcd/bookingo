const mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user : 'root',
    password:'',
    database : 'bookingo'
})

connection.connect(function(error)
{
    if(!!error)
    {
        console.log(error);
    }
    else{console.log("Connected to the db");}
})
module.exports = connection;