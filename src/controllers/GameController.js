const Game = require('../models/Game');

module.exports = {
    async store(req, res) {
        const { title, year, price } = req.body;
        const game = await Game.create({ title, year, price });
        return res.json(game);
    }
};