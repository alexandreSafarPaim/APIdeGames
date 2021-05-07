const User = require('../models/User');
const bcrypt = require('bcryptjs');
const StatusError = require('../errors/StatusError');

module.exports = {
    async create(req, res) {
        try {
            const { name, email, password } = req.body

            if (!name || !email || !password) throw new StatusError(400, 'Some information undefined');
            if (name === "" || email === "" || password === "") throw new StatusError(400, 'Some information undefined');

            //encrypting password
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            const user = await User.create({ name, email, password: passwordHash });

            if (user == undefined) throw new StatusError(500, 'Database Error');

            //removing password to display user information
            user.password = undefined

            return res.json(user);
        } catch (err) {
            return res.status(err.status).send({ error: err.message });
        }
    },

    async listAll(req, res) {
        try {
            //find all users, excluding password
            const users = await User.findAll({ attributes: { exclude: 'password' } });

            if (users == undefined) throw new StatusError(500, 'Database Error');

            return res.json(users);
        } catch (err) {
            return res.status(err.status).send({ error: err.message });
        }
    },

    async delete(req, res) {
        try {
            if (isNaN(req.params.id)) throw new StatusError(400, 'ID must be a the numeric type');
            const id = req.params.id;

            if (await User.destroy({ where: { id } }) === 0) throw new StatusError(404, 'User not found');

            return res.send({ message: 'User has been deleted' });

        } catch (err) {
            return res.status(err.status).send({ error: err.message });
        }
    }
}