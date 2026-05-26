const db = require('../config/db');

exports.listar = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT r.*, m.titulo, m.artista, m.capa_url
       FROM registros r
       JOIN musicas m ON r.musica_id = m.id
       WHERE r.usuario_id = ?
       ORDER BY r.ouvido_em DESC`,
      [req.usuario.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.criar = async (req, res) => {
  const { musica_id, avaliacao, comentario } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO registros (usuario_id, musica_id, avaliacao, comentario) VALUES (?,?,?,?)',
      [req.usuario.id, musica_id, avaliacao, comentario]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.estatisticas = async (req, res) => {
  try {
    const [total] = await db.query(
      'SELECT COUNT(*) as total FROM registros WHERE usuario_id = ?',
      [req.usuario.id]
    );
    const [porGenero] = await db.query(
      `SELECT m.genero, COUNT(*) as quantidade
       FROM registros r
       JOIN musicas m ON r.musica_id = m.id
       WHERE r.usuario_id = ?
       GROUP BY m.genero ORDER BY quantidade DESC`,
      [req.usuario.id]
    );
    const [mediaAvaliacao] = await db.query(
      'SELECT ROUND(AVG(avaliacao),1) as media FROM registros WHERE usuario_id = ?',
      [req.usuario.id]
    );
    res.json({
      total: total[0].total,
      porGenero,
      mediaAvaliacao: mediaAvaliacao[0].media
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.deletar = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(
      'DELETE FROM registros WHERE id = ? AND usuario_id = ?',
      [id, req.usuario.id]
    );
    res.json({ mensagem: 'Registro deletado' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};