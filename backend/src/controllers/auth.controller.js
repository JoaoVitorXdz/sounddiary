const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

exports.cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const [existe] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existe.length > 0)
      return res.status(400).json({ erro: 'Email já cadastrado' });

    const hash = await bcrypt.hash(senha, 10);
    await db.query(
      'INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)',
      [nome, email, hash]
    );
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro no servidor', detalhe: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length === 0)
      return res.status(401).json({ erro: 'Email ou senha inválidos' });

    const usuario = rows[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaValida)
      return res.status(401).json({ erro: 'Email ou senha inválidos' });

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro no servidor', detalhe: err.message });
  }
};