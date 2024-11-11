const db = require('../config/db');

exports.criarUsuario = (req, res) => {
  const { nome, email, senha } = req.body;
  const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  db.query(sql, [nome, email, senha], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, nome, email });
  });
};

exports.listarUsuarios = (req, res) => {
  const sql = 'SELECT * FROM usuarios';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.obterUsuarioPorId = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM usuarios WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('Usuário não encontrado');
    res.json(result[0]);
  });
};

exports.atualizarUsuario = (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  const sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';
  db.query(sql, [nome, email, senha, id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Usuário não encontrado');
    res.send('Usuário atualizado com sucesso');
  });
};

exports.deletarUsuario = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM usuarios WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Usuário não encontrado');
    res.send('Usuário deletado com sucesso');
  });
};