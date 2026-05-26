const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.atualizar = async (req, res) => {
  const { nome, email, senha_atual, nova_senha } = req.body;
  const id = req.usuario.id;

  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });

    const usuario = rows[0];

    if (senha_atual) {
      const senhaValida = await bcrypt.compare(senha_atual, usuario.senha_hash);
      if (!senhaValida) return res.status(401).json({ erro: 'Senha atual incorreta' });
    }

    let novaHash = usuario.senha_hash;
    if (nova_senha) {
      novaHash = await bcrypt.hash(nova_senha, 10);
    }

    const emailFinal = email || usuario.email;
    const nomeFinal = nome || usuario.nome;

    if (email && email !== usuario.email) {
      const [existe] = await db.query('SELECT id FROM usuarios WHERE email = ? AND id != ?', [email, id]);
      if (existe.length > 0) return res.status(400).json({ erro: 'Email já em uso' });
    }

    await db.query(
      'UPDATE usuarios SET nome = ?, email = ?, senha_hash = ? WHERE id = ?',
      [nomeFinal, emailFinal, novaHash, id]
    );

    res.json({ mensagem: 'Perfil atualizado', usuario: { id, nome: nomeFinal, email: emailFinal } });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.atualizarFoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ erro: 'Nenhuma foto enviada' });
    const fotoUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    await db.query('UPDATE usuarios SET foto_perfil = ? WHERE id = ?', [fotoUrl, req.usuario.id]);
    res.json({ mensagem: 'Foto atualizada', foto_perfil: fotoUrl });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.getPerfil = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, nome, email, foto_perfil, criado_em FROM usuarios WHERE id = ?',
      [req.usuario.id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};