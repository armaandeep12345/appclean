const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'drycleaner_db'
});

// Connect to DB
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to database');
});

// Create Table if not exists
const createTableQuery = `
CREATE TABLE IF NOT EXISTS form1 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    product VARCHAR(50) NOT NULL,
    size VARCHAR(10) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    notes TEXT
)`;

db.query(createTableQuery, (err) => {
    if (err) {
        console.error('Error creating table:', err);
    } else {
        console.log("Table 'form1' is ready");
    }
});

// Order Submission Route
app.post('/submit-order', (req, res) => {
    const { name, email, phone, address, product, size, quantity, notes } = req.body;

    if (!name || !email || !phone || !address || !product || !size || !quantity) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const sql = `INSERT INTO form1 (name, email, phone, address, product, size, quantity, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [name, email, phone, address, product, size, quantity, notes || ''];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting order:', err);
            return res.status(500).json({ message: 'Order submission failed' });
        }
        res.status(201).json({ message: 'Order placed successfully', orderId: result.insertId });
    });
});

// Fetch all orders
app.get('/get-orders', (req, res) => {
    const sql = 'SELECT * FROM form1';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).json({ message: 'Failed to fetch orders' });
        }
        res.status(200).json(results);
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
