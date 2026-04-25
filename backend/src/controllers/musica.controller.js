const db = require('../config/db');

exports.listar = async (req, res) => {
  try {
    const [musicas] = await db.query('SELECT * FROM musicas ORDER BY titulo');
    res.json(musicas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.buscar = async (req, res) => {
  const { q } = req.query;
  try {
    const [musicas] = await db.query(
      'SELECT * FROM musicas WHERE titulo LIKE ? OR artista LIKE ?',
      [`%${q}%`, `%${q}%`]
    );
    res.json(musicas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.criar = async (req, res) => {
  const { titulo, artista, album, genero, duracao_seg, capa_url } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO musicas (titulo, artista, album, genero, duracao_seg, capa_url) VALUES (?,?,?,?,?,?)',
      [titulo, artista, album, genero, duracao_seg, capa_url]
    );
    res.status(201).json({ id: result.insertId, titulo, artista });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
exports.atualizar = async (req, res) => {
  const { id } = req.params;
  const { titulo, artista, album, genero, duracao_seg, capa_url } = req.body;
  try {
    await db.query(
      'UPDATE musicas SET titulo=?, artista=?, album=?, genero=?, duracao_seg=?, capa_url=? WHERE id=?',
      [titulo, artista, album, genero, duracao_seg, capa_url, id]
    );
    res.json({ mensagem: 'Música atualizada' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};