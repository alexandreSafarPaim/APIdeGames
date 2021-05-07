const router = require('express').Router();
const GameController = require('../controllers/GameController');

router.get('/games', GameController.findAll);

router.get('/games/:id', GameController.findById);

router.post('/games', GameController.store);

router.delete('/games/:id', GameController.delete);

router.put('/games/:id', GameController.edit);

module.exports = router;