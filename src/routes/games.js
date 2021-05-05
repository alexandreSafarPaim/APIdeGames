const router = require('express').Router();
const DB = require('../database/gamesDB');
const gamesController = require('../controllers/games');

router.get('/games', (req, res) => {
    res
        .status(200)
        .json(DB.games);
})

router.get('/games/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    }

    let id = parseInt(req.params.id);

    try {
        game = gamesController.FindById(DB, id);
        res.status(200).json(game);
    } catch (err) {
        res.sendStatus(404);
    }

})

router.post('/games', (req, res) => {
    const { id, title, year, price } = req.body
    const game = {
        id,
        title,
        year,
        price
    }
    try {
        const newGame = gamesController.CreateNewGame(DB, game)
        res.status(200).json(newGame);
    } catch (err) {
        res.sendStatus(400);
    }
})

router.delete('/games/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    }

    let id = parseInt(req.params.id);

    try {
        game = gamesController.DeleteGame(DB, id);
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(404);
    }
})

router.put('/games/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    }

    let id = parseInt(req.params.id);

    const { title, year, price } = req.body
    const game = {
        title,
        year,
        price
    }
    try {
        gamesController.EditGame(DB, id, game)
        res.status(200).json(game);
    } catch (err) {
        res.sendStatus(400);
    }
})

module.exports = router;