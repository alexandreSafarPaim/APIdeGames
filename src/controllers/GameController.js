const Game = require('../models/Game');

class MyError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

module.exports = {

    async store(req, res) {
        try {
            const { title, year, price } = req.body;
            const game = await Game.create({ title, year, price });
            if (game == undefined) throw new MyError(400, 'The game cannot be added ')
            return res.json(game);
        } catch (err) {
            return res.status(err.status).send(err.message);
        }
    },

    async findAll(req, res) {
        const games = await Game.findAll()
        return res.json(games);
    },

    async findById(req, res) {
        try {
            if (isNaN(req.params.id)) throw new MyError(400, 'ID must be a the numeric type');
            const id = req.params.id;
            const game = await Game.findOne({ where: { id } });
            if (game == undefined) throw new MyError(404, 'Game not found');
            return res.json(game);
        } catch (err) {
            return res.status(err.status).send(err.message);
        }
    },

    async delete(req, res) {
        try {
            if (isNaN(req.params.id)) throw new MyError(400, 'ID must be a the numeric type');
            const id = req.params.id;
            if (await Game.destroy({ where: { id } }) === 0) throw new MyError(404, 'Game not found');
            return res.send('Game has been deleted');
        } catch (err) {
            return res.status(err.status).send(err.message);
        }
    },

    async edit(req, res) {
        try {
            if (isNaN(req.params.id)) throw new MyError(400, 'ID must be a the numeric type');
            const id = req.params.id;
            const { title, year, price } = req.body;
            const [succes] = await Game.update({ title, year, price }, { where: { id } })
            if (succes === 0) throw new MyError(404, 'Game not found')
            const game = await Game.findOne({ where: { id } })
            return res.json(game);
        } catch (err) {
            return res.status(err.status).send(err.message);
        }
    }
};