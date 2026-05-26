const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const auth = require('../middlewares/auth.middleware');
const upload = require('../config/upload');

router.get('/perfil', auth, usuarioController.getPerfil);
router.put('/perfil', auth, usuarioController.atualizar);
router.post('/perfil/foto', auth, upload.single('foto'), usuarioController.atualizarFoto);

module.exports = router;