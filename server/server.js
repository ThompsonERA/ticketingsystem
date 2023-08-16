const express = require('express');
const mysql = require('mysql2');
const cors = require("cors");
require("dotenv").config({ path: '.env' });

const PORT = process.env.PORT
const app = express();

const pool = mysql.createPool({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectionLimit: 10,
});

app.use(express.json());
app.use(cors({
    origin:"*",
}))

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
    pool.query("INSERT INTO ticket (summary,priority,status) values (?,?,?)", [ticket.summary,ticket.priority,ticket.status], 
        (error, result) => {
            if (error) {
                console.error(error);
                res.send(error);
                return;
            }
            res.send({ id: result.insertId, ...ticket });
        }
    )
});

app.delete("/ticket/:id", (req, res) => {
    const id = req.params.id;
    pool.query('DELETE * FROM ticket where id = ?', [id], (error, result) => {
        if (error) {
            console.error(error);
            res.send(error);
            return;
        }
        res.send('Success');
    })
});

app.put('/ticket/:id', (req, res) => {
    const id = req.params.id;
    const ticket = req.body;
    pool.query('UPDATE ticket set ? WHERE id = ?', [ticket, id],
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


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})