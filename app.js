const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const port = process.env.PORT || 3000;

let sql;

let userid;

// MySQL Database Creation
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'attendance'
});

// Connect Database
db.connect((err) => {
    if(err)throw err;
    let connected = true;
    console.log('MySql Connected...');
    sql = 'CREATE DATABASE IF NOT EXISTS attendance';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        console.log('Database created...');
    });
    sql = 'CREATE TABLE IF NOT EXISTS users(id int AUTO_INCREMENT, name VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        console.log('Users table created...');
    });
    sql = 'CREATE TABLE IF NOT EXISTS timings(date DATE, time_in TIME, time_out TIME, PRIMARY KEY (date))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        console.log('Timings table created...');
    });
   /* sql = 'CREATE DEFINER=`root`@`localhost` EVENT `Add New Timing` ON SCHEDULE EVERY 1 DAY STARTS '2020-03-05 11:35:40.000000' ENDS '2020-05-31 11:35:40.000000' ON COMPLETION PRESERVE ENABLE DO INSERT INTO timings(date) VALUES(CURRENT_DATE)';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        console.log('Event created...');
    }); */
});

// HTTP Requests
app.use(bodyParser.json());

// Authorization
app.post('/auth', (req, res) =>{
    let user = req.body.username;
    let password = req.body.pwd;
    sql = `SELECT id, user_name, password FROM users WHERE user_name = '${user}' AND password = '${password}'`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        if(result.length != 0){
            res.send('true');
            let string = JSON.stringify(result);
            let json = JSON.parse(string);
            userid = json[0].id;
            console.log(userid);
        }
        else{
            res.send(false);
        }
    });
});

// Maintain user session data
app.get('/identify', (req, res) => {
    sql = `SELECT name FROM users WHERE id = ${userid}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
});

//Update user screen name
app.get('/update', (req, res) => {
    sql = `SELECT time_in, time_out FROM timings WHERE date = CURRENT_DATE() AND id = ${userid}`
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
});


// Add time_in to Database
app.get('/timein', (req, res) => {
    sql = `UPDATE timings SET time_in = CURRENT_TIME() WHERE date = CURRENT_DATE() AND id = ${userid}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    })
});

// Add timeout to Database
app.get('/timeout', (req, res) => {
    sql = `UPDATE timings SET time_out = CURRENT_TIME() WHERE date = CURRENT_DATE() AND id = ${userid}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    })
});

/*
//dummy function
app.post('/process', (req, res) => {
    console.log('posting');
    if(true){
        console.log('connected');
        console.log(req.body);
        let post = {
            name: req.body.name,
            password: req.body.password
        };
        sql = 'INSERT INTO users SET ?';
        db.query(sql, post, function(err, result){
            if(err) throw err;
            console.log('1 record inserted');
        });

    }
}); */

// Update time worked in one day
app.get('/workedtoday', (req, res) => {
    sql = `UPDATE timings SET hours_worked = time_out - time_in WHERE date = CURRENT_DATE() AND id = ${userid}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    })
    sql = `UPDATE timings SET time_diff = TIMEDIFF(time_out, time_in) WHERE date = CURRENT_DATE() AND id = ${userid}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    })
});


// Get total hours worked
app.get('/hours', (req, res) => {
    sql = `SELECT SUM(time_diff) FROM timings WHERE date > date_sub(now(), interval 1 week) AND id = ${userid}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result);
    }) 
});

// Count threshold hours
app.get('/threshold', (req, res) => {
    sql = `SELECT * FROM timings WHERE date > date_sub(CURRENT_DATE, INTERVAL 1 WEEK)`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result.length * 9);
    })
});

// Calculate leaves
app.get('/leaves', (req, res) => {
    sql = `UPDATE timings SET leaves = \'Yes\' WHERE id=${userid} AND time_in IS NULL`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Leaves updated');
    })
    sql = 'SELECT * FROM timings WHERE leaves IS NULL';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result.length);
    })
});

// Change password
app.post('/change', (req, res) => {
    let password = req.body.pwd;
    sql = `UPDATE users WHERE id = ${userid} SET password = ${password}`
    db.query(sql, function(err, result){
        if(err) throw err;
        console.log('Password Changed');
    });
});

// Show Report
app.post('/report', (req, res) => {
    let date = req.body.date;
    sql = `SELECT * FROM timings WHERE date = ${date}`;
    db.query(sql, function(err, result){
        if(err) throw err;
        console.log(result);
        res.send(result);
    });

});


// Update Missing Times
/*app.post('/missing', (req, res) => {
    let post = {
        dfsdf
    };
    sql = `UPDATE users WHERE id = ${userid} SET ?`
    db.query(sql, post, function(err, result){
        if(err) throw err;
        console.log('Password Changed');
    });
}); */


// Server Listening

app.listen(port, () => console.log(`Listening on port ${port} ... `));