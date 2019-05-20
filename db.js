var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'todouser',
    password: '1234',
    database: 'task'
});
db.connect();
module.exports = db;