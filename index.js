const express = require('express');
const bodyParser = require("body-parser");
const Dbchanger = require('./dbchanger');
const Template = require('./template')
var db = require('./db');

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
var toEdit = ``;

app.get("/", function (req, res) {
    db.query(`select * from todo`, function (error, task) {
        db.query(`select * from done`, function (error, done) {
            res.render("index", { task, done, toEdit });
        })
    })
});

app.post('/addtask', function (req, res) {
    var title = req.body.title;
    var stars = req.body.star;
    var description = req.body.description || null;
    var deadline = req.body.deadline || null;
    dbchanger.addTask({ title, description, deadline, stars });
    res.redirect("/");
});

app.post('/openUpdater', function (req, res) {
    var id = req.body.check;
    db.query(`select * from todo where id=?`, [id], function (error, task) {
        const title = task[0].title;
        const star = task[0].star;
        const description = task[0].description;
        const date = task[0].date;
        toEdit += template.updateModule({ id, title, star, description, date })
    })
    res.redirect("/");
});

app.post('/updateTask', function (req, res) {
    var id = req.body.updatedId;
    var title = req.body.newTitle;
    var stars = req.body.newStar;
    var description = req.body.newDescription || null;
    var deadline = req.body.newDeadline || null;
    console.log(req.body.preDeadline);
    dbchanger.updateTask({ title, description, deadline, stars, id });
    toEdit = ``;
    res.redirect("/");
});

app.post("/removeTask", function (req, res) {
    var id = req.body.check;
    if (typeof id === 'string') {
        dbchanger.deleteTask({ table: "todo", id });
    }
    if (typeof id === 'object') {
        id.forEach(idNum => {
            dbchanger.deleteTask({ table: "todo", id: idNum });
        });
    }
    res.redirect("/");
});

app.post("/doneTask", function (req, res) {
    var id = req.body.check;
    if (typeof id === 'string') {
        dbchanger.moveTask({ intoTable: 'done', fromTable: 'todo', id });
        dbchanger.deleteTask({ table: "todo", id });
    }
    if (typeof id === 'object') {
        id.forEach(idNum => {
            dbchanger.moveTask({ intoTable: 'done', fromTable: 'todo', id: idNum });
            dbchanger.deleteTask({ table: "todo", id: idNum });
        });
    }
    res.redirect("/");
})

app.post("/removeDone", function (req, res) {
    var id = req.body.doneCheck;
    if (typeof id === 'string') {
        dbchanger.deleteTask({ table: "done", id });
    }
    if (typeof id === 'object') {
        id.forEach(idNum => {
            dbchanger.deleteTask({ table: "done", id: idNum });
        });
    }
    res.redirect("/");
});

const dbchanger = new Dbchanger();
const template = new Template();


app.listen(3000, function () {
    console.log('listening on port 3000')
});