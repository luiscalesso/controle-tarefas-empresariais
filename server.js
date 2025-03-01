const express = require('express');
const cors = require('cors');  // Importando o pacote CORS
const db = require('./db');
const app = express();
const port = 3000;

// Middleware (app para comunicação entre apps, SO's e BD)
app.use(cors());  // Permitindo CORS
app.use(express.json());

// Rota para criar um novo projeto
app.post('/projetos', (req, res) => {
    const { nome, descricao } = req.body;
    if (!nome || !descricao) {
        return res.status(400).json({ error: 'Nome e descrição são obrigatórios!' });
    }

    const query = 'INSERT INTO projetos (nome, descricao) VALUES (?, ?)';
    db.run(query, [nome, descricao], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, nome, descricao });
    });
});

// Rota para editar um projeto
app.put('/projetos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    if (!nome || !descricao) {
        return res.status(400).json({ error: 'Nome e descrição são obrigatórios!' });
    }

    const query = 'UPDATE projetos SET nome = ?, descricao = ? WHERE id = ?';
    db.run(query, [nome, descricao, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Projeto não encontrado!' });
        }
        res.status(200).json({ id, nome, descricao });
    });
});

// Rota para excluir um projeto
app.delete('/projetos/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM projetos WHERE id = ?';
    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Projeto não encontrado!' });
        }
        res.status(200).json({ message: 'Projeto excluído com sucesso!' });
    });
});

// Rota para listar todos os projetos
app.get('/projetos', (req, res) => {
    const query = 'SELECT * FROM projetos';
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
