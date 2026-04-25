const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', require('express').static('src/uploads'));

const authRoutes     = require('./routes/auth.routes');
const musicaRoutes   = require('./routes/musica.routes');
const registroRoutes = require('./routes/registro.routes');
const favoritoRoutes = require('./routes/favorito.routes');

app.use('/api/auth',      authRoutes);
app.use('/api/musicas',   musicaRoutes);
app.use('/api/registros', registroRoutes);
app.use('/api/favoritos', favoritoRoutes);

const usuarioRoutes = require('./routes/usuario.routes');
app.use('/api/usuarios', usuarioRoutes);

module.exports = app;