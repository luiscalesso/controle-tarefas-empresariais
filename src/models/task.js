const db = require('../config/db');

//Criar a tabela de tarefas
db.serialize(() => {
    db.run(`  
        CREATE TABLE IF NOT EXISTS tarefas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descricao TEXT,
        status TEXT NOT NULL DEFAULT 'pendente',
        data_criacao TEXT DEFAULT CURRENT_TIMESTAMP
    )
   `);
});

module.exports = {
//função para criar uma tarefa
creatTask: (titulo, descricao, callback) => {
    const sql = 'insert INTO tarefas (titulo, descricao, status) VALUES (?, ?, ?)';
    db.run(sql, [titulo, descricao, 'pendente'],function (err) {
    callback(err, this.lastID);

        
    });
},
// Função para buscar todas as tarefas
getALLTasks: (callback) => {
    const sql = 'SELECT * FROM tarefas';
    db.all(sql, [], (err, rows) => {
    callback(err, rows);
    });
},
// Função para atualizar o status da tarefa
updateTaskStatus: (id, status, callback) => {
    const sql = 'UPDATE tarefas SET status = ? WHERE id = ?';
    db.run(sql, [status, id], function(err) {
    callback(err, this.changes);
    });
},
// Função para excluir uma tarefa
deleteTask: (id, callback) => {
    const sql = 'DELETE FROM tarefas WHERE id = ?';
    db.run(sql, [id], function (err){
    callback(err, this.changes);
    });
   }
};