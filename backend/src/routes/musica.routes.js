const express = require('express');
const router = express.Router();
const musicaController = require('../controllers/musica.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/',        auth, musicaController.listar);
router.get('/buscar',  auth, musicaController.buscar);
router.post('/',       auth, musicaController.criar);
router.put('/:id', auth, musicaController.atualizar);

module.exports = router;