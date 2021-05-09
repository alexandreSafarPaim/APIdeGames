const Game = require('../models/Game');
const StatusError = require('../errors/StatusError');

module.exports = {

    async store(req, res) {
        try {
            const { title, year, price } = req.body;
            const game = await Game.create({ title, year, price });
            if (game == undefined) throw new StatusError(500, 'Database Error ')
            return res.json(game);
        } catch (err) {
            return res.status(err.status).send({ error: err.message });
        }
    },

    async findAll(req, res) {
        const games = await Game.findAll()

        //HATEOAS
        for (const game of games) {
            game.setDataValue('links', [{
                    href: `http://localhost:3000/${game.id}`,
                    method: 'GET',
                    rel: 'game-by-id'
                },
                {
                    href: `http://localhost:3000/${game.id}`,
                    method: 'DELETE',
                    rel: 'delete'
                },
                {
                    href: `http://localhost:3000/${game.id}`,
                    method: 'PUT',
                    rel: 'edit'
                },

            ])
        }

        return res.json(games);
    },

    async findById(req, res) {
        try {
            if (isNaN(req.params.id)) throw new StatusError(400, 'ID must be a the numeric type');
            const id = req.params.id;
            const game = await Game.findOne({ where: { id } });
            if (game == undefined) throw new StatusError(404, 'Game not found');
            return res.json(game);
        } catch (err) {
            return res.status(err.status).send({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            if (isNaN(req.params.id)) throw new StatusError(400, 'ID must be a the numeric type');
            const id = req.params.id;
            if (await Game.destroy({ where: { id } }) === 0) throw new StatusError(404, 'Game not found');
            return res.send({ message: 'Game has been deleted' });
        } catch (err) {
            return res.status(err.status).send({ error: err.message });
        }
    },

    async edit(req, res) {
        try {
            if (isNaN(req.params.id)) throw new StatusError(400, 'ID must be a the numeric type');
            const id = req.params.id;
            const { title, year, price } = req.body;
            const [succes] = await Game.update({ title, year, price }, { where: { id } })
            if (succes === 0) throw new StatusError(404, 'Game not found')
            const game = await Game.findOne({ where: { id } })
            return res.json(game);
        } catch (err) {
            return res.status(err.status).send({ error: err.message });
        }
    }
};