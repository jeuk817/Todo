var db = require('./db');

class Dbchanger {
    addTask(task) {
        const { title, description, deadline, stars } = task;
        db.query(`insert into todo (title, description, date, star) values (?,?,?,?)`, [title, description, deadline, stars], function (error, todos) {
            if (error) throw error;
        })
    }

    updateTask(newTask) {
        const { title, description, deadline, stars, id } = newTask;
        db.query(`UPDATE todo SET title =?, description=?, date=?, star=? WHERE id=?`, [title, description, deadline, stars, id], function (error, todos) {
            if (error) throw error;
        })
    }

    deleteTask(obj) {
        const { table, id } = obj;
        db.query(`delete from ${table} where id=?`, [id], function (error, task) {
            if (error) throw error;
        })
    }

    moveTask(obj) {
        const { intoTable, fromTable, id } = obj;
        db.query(`INSERT INTO ${intoTable} SELECT * FROM ${fromTable} where id =?`, [id], function (error, task) {
            if (error) throw error;
        })
    }
}

module.exports = Dbchanger;