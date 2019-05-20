var express = require('express');
var bodyParser = require("body-parser");
var db = require('./db');

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
var done = [];

app.get("/", function (req, res) {
    db.query(`select * from todo`, function (error, task) {
        db.query(`select * from done`, function (error, done) {
            res.render("index", { task, done });
        })
    })
});

app.post('/addtask', function (req, res) {
    var title = req.body.title;
    var stars = req.body.star;
    var description = req.body.description || null;
    var deadline = req.body.deadline || null;
    db.query(`insert into todo (title, description, date, star) values (?,?,?,?)`, [title, description, deadline, stars], function (error, todos) {
        if (error) throw error;
    })
    res.redirect("/");
});

app.post("/updateTask", function (req, res) {
    var id = req.body.update;
    // var index = task.findIndex(x => x.id == id);
    // task.splice(index, 1);
    res.redirect("/");
});

app.post("/removeTask", function (req, res) {
    var id = req.body.check;
    db.query(`delete from todo where id=?`, [id], function (error, task) {
        if (error) throw error;
    })
    res.redirect("/");
});

app.post("/doneTask", function (req, res) {
    var id = req.body.check;
    if (typeof id === 'string') {
        db.query(`INSERT INTO done SELECT * FROM todo where id =?`, [id], function (error, task) {
            if (error) throw error;
        })
        db.query(`delete from todo where id=?`, [id], function (error, task) {
            if (error) throw error;
        })
    }
    if (typeof id === 'object') {
        id.forEach(idNum => {
            db.query(`INSERT INTO done SELECT * FROM todo where id =?`, [idNum], function (error, task) {
                if (error) throw error;
            })
            db.query(`delete from todo where id=?`, [idNum], function (error, task) {
                if (error) throw error;
            })
        });
    }
    res.redirect("/");
})


app.listen(3000, function () {
    console.log('listening on port 3000')
});