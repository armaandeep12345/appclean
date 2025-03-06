const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'drycleaner_db'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL Database');
    }
});

// Handle Order Placement
app.post('/order', (req, res) => {
    const { item_name, quantity, price } = req.body;

    if (!item_name || !quantity || !price) {
        return res.status(400).json({ message: 'Missing order details' });
    }

    const query = 'INSERT INTO womenclothes (item_name, quantity, price) VALUES (?, ?, ?)';
    db.execute(query, [item_name, quantity, price], (err, result) => {
        if (err) {
            console.error('Error inserting order:', err);
            res.status(500).json({ message: 'Order placement failed' });
        } else {
            res.json({ message: 'Order placed successfully', orderId: result.insertId });
        }
    });
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
