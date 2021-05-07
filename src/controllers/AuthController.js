const bcrypt = require('bcryptjs');
const User = require('../models/User');
const StatusError = require('../errors/StatusError');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (email == undefined || password == undefined)
                throw new StatusError(400, 'Email and/or password undefined');

            const user = await User.findOne({ where: { email } })

            if (!user) throw new StatusError(404, 'User not found');
            if (!await bcrypt.compare(password, user.password))
                throw new StatusError(401, 'Invalid credentials');

            user.password = undefined;

            const token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: "1d"
            });

            res.status(200).json({ token });
        } catch (err) {
            return res.status(err.status).send({ error: err.message });
        }

    }
}