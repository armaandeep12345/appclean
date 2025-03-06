const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(__dirname));  // Serve HTML file
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'womenclothes'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Insert Data Route
app.post('/insert', (req, res) => {
    const { name, description, price, image_url } = req.body;
    const sql = "INSERT INTO services (name, description, price, image_url) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, description, price, image_url], (err, result) => {
        if (err) throw err;
        console.log('Data Inserted:', result);
        res.send("<h2>Service Added Successfully!</h2><a href='/'>Go Back</a>");
    });
});

// Start Server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
