const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registro.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/',            auth, registroController.listar);
router.post('/',           auth, registroController.criar);
router.get('/estatisticas', auth, registroController.estatisticas);
router.delete('/:id', auth, registroController.deletar);

module.exports = router;