const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Create
app.post('/api/items', (req, res) => {
    const { name, description } = req.body;
    db.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, name, description });
    });
});

// Read
app.get('/api/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Buscar por id

app.get('/api/items/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM items WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Erro ao buscar item:', err);
            res.status(500).json({ error: 'Erro ao buscar item' });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'Item não encontrado' });
        } else {
            res.json(result[0]);
        }
    });
});



// Update
app.put('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    
    db.query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id], (err) => {
        if (err) throw err;
        res.json({ id, name, description });
    });
});

// Delete
app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM items WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Item deleted' });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
