const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Usar __dirname para garantir que o caminho seja relativo à pasta onde o db.js está
const dbPath = path.join(__dirname, '..', 'database.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conexão com o banco de dados estabelecida.');
    // Cria a tabela "projetos" se não existir
    db.run(`CREATE TABLE IF NOT EXISTS projetos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT NOT NULL
    )`);
  }
});

module.exports = db;
