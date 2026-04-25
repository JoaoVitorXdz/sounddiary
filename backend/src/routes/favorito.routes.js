const express = require('express');
const router = express.Router();
const favoritoController = require('../controllers/favorito.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/',              auth, favoritoController.listar);
router.post('/',             auth, favoritoController.adicionar);
router.delete('/:musica_id', auth, favoritoController.remover);

module.exports = router;