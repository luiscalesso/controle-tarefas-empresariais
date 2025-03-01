const sqlite3 = require('sqlite3').verbose();

// Conecta ao banco de dados SQLite (se o arquivo não existir, ele será criado)
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  }
});

// Cria uma tabela de exemplo, se não existir
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS projetos (id INTEGER PRIMARY KEY, nome TEXT)");

  const stmt = db.prepare("INSERT INTO projetos (nome) VALUES (?)");

  // Insere alguns dados de exemplo
  stmt.run('Projeto 1');
  stmt.run('Projeto 2');
  stmt.finalize();

  // Recupera os dados inseridos
  db.each("SELECT id, nome FROM projetos", (err, row) => {
    if (err) {
      console.error('Erro ao buscar dados:', err.message);
    } else {
      console.log(`${row.id}: ${row.nome}`);
    }
  });
});

// Fecha a conexão
db.close((err) => {
  if (err) {
    console.error('Erro ao fechar a conexão:', err.message);
  } else {
    console.log('Conexão fechada.');
  }
});
