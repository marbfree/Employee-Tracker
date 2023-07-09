// import express and mysql2 (why mysql2?)
const express = require('express');
const mysql = require('mysql2');

// opens up available or declared ports
const PORT = process.env.PORT || 3001;
// callback function for express
const app = express();

// middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// creates server connection to employee database(?)
const db = mysql.createConnection(
    {
        host: 'localhost', 
        user: 'root', 
        password: '', 
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database.')
);

// respond with 404 status
app.use((req, res) => {
    res.status(404).end();
});

// listens for api hit
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});