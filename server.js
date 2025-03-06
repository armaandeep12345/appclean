const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON requests

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Default MySQL username in XAMPP
    password: "", // Default is empty in XAMPP
    database: "drycleaner_db"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL database.");
});

// Handle booking submission
app.post("/book", (req, res) => {
    const { name, phone, service, date } = req.body;

    if (!name || !phone || !service || !date) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const sql = "INSERT INTO bookings (name, phone, service, date) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, phone, service, date], (err, result) => {
        if (err) {
            console.error("Error inserting data: " + err);
            return res.status(500).json({ message: "Database error." });
        }
        res.json({ message: `Thank you, ${name}! Your ${service} pickup is scheduled for ${date}.` });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Fetch all bookings
app.get("/bookings", (req, res) => {
    const sql = "SELECT * FROM bookings ORDER BY date DESC";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ message: "Database error." });
        }
        res.json(results);
    });
});
