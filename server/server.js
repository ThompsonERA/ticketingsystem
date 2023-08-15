const express = require('express');
const mysql = require('mysql2');
require("dotenv").config({path: '.env'});

const app = express();

const pool = mysql.createPool({
    host: process.env.HOST,
    database:process.env.DATABASE,
    user:process.env.USER,
    password: process.env.PASSWORD,
    connectionLimit: 10,
})

app.get('/',(req,res) =>{
    pool.query('SELECT * FROM test',(error,result) => {
        if (error){
            console.error(error);
            res.send(error);
            return;
        }
        res.send(result);
    })
})

app.listen(3000,() =>{
    console.log('Server is running on port 3000');
})