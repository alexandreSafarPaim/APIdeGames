const router = require('express').Router();
const GameController = require('./controllers/GameController');
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');

const auth = require('./middlewares/auth');


//Games Routes
router.get('/games', GameController.findAll);
router.get('/games/:id', GameController.findById);
router.post('/games', auth, GameController.store);
router.delete('/games/:id', auth, GameController.delete);
router.put('/games/:id', auth, GameController.edit);

//User Routes
router.get('/user', auth, UserController.listAll)
router.post('/user', UserController.create)
router.delete('/user/:id', auth, UserController.delete)

//Auth Routes
router.post('/auth', AuthController.login)

module.exports = router;