// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Dados em memória (simulando um banco de dados)
let items = [];
let currentId = 1;

// Rotas CRUD
// Create
app.post('/api/items', (req, res) => {
    const { name, description } = req.body;
    const newItem = { id: currentId++, name, description };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Read All
app.get('/api/items', (req, res) => {
    res.json(items);
});

// Read One
app.get('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(i => i.id === id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item não encontrado' });
    }
});

// Update
app.put('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description } = req.body;
    const itemIndex = items.findIndex(i => i.id === id);
    if (itemIndex !== -1) {
        items[itemIndex] = { id, name, description };
        res.json(items[itemIndex]);
    } else {
        res.status(404).json({ message: 'Item não encontrado' });
    }
});

// Delete
app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex(i => i.id === id);
    if (itemIndex !== -1) {
        const deletedItem = items.splice(itemIndex, 1);
        res.json(deletedItem[0]);
    } else {
        res.status(404).json({ message: 'Item não encontrado' });
    }
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
