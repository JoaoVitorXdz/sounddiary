const db = require('../config/db');

exports.listar = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT f.*, m.titulo, m.artista, m.capa_url, m.genero
       FROM favoritos f
       JOIN musicas m ON f.musica_id = m.id
       WHERE f.usuario_id = ?`,
      [req.usuario.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.adicionar = async (req, res) => {
  const { musica_id } = req.body;
  try {
    await db.query(
      'INSERT INTO favoritos (usuario_id, musica_id) VALUES (?,?)',
      [req.usuario.id, musica_id]
    );
    res.status(201).json({ mensagem: 'Favoritado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.remover = async (req, res) => {
  const { musica_id } = req.params;
  try {
    await db.query(
      'DELETE FROM favoritos WHERE usuario_id = ? AND musica_id = ?',
      [req.usuario.id, musica_id]
    );
    res.json({ mensagem: 'Removido dos favoritos' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};