const express = require('express');
const mysql = require('mysql2');
require("dotenv").config({ path: '.env' });

const app = express();

const pool = mysql.createPool({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectionLimit: 10,
})

app.get('/all', (req, res) => {
    pool.query('SELECT * FROM ticket', (error, result) => {
        if (error) {
            console.error(error);
            res.send(error);
            return;
        }
        res.send(result);
    })
});

app.get("/ticket/:id", (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM ticket where id = ?', [id], (error, result) => {
        if (error) {
            console.error(error);
            res.send(error);
            return;
        }
        res.send(result);
    })
});

app.post("/ticket", (req, res) => {
    const ticket = req.body;
    pool.query("INSERT INTO ticket (summer,priority,status) values(?,?,?)", [ticket.summery, ticket.priority, ticket.status], (error, result) => {
        (error, result) => {
            if (error) {
                console.error(error);
                res.send(error);
                return;
            }
            res.send({ id: result.insertId, ...ticket });
        }
    })
});

app.put('/ticket', (req, res) => {
    const ticket = req.body;
    pool.query('UPDATE ticket set ? WHERE id = ?', [ticket, ticket.id],
        (error, result) => {
            if (error) {
                console.error(error);
                res.send(error);
                return;
            }

            res.send({ ticket });
        }
    );
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})