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

            //decrypt password
            if (!await bcrypt.compare(password, user.password))
                throw new StatusError(401, 'Invalid credentials');

            //jwt token generation
            const token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: "1d"
            });

            const refreshToken = jwt.sign({}, authConfig.refreshSecret, {
                expiresIn: "1d"
            });

            await User.update({ refreshToken }, { where: { id: user.id } })

            user.password = undefined;
            user.refreshToken = undefined;

            res.status(200).json({ user, token, refreshToken });
        } catch (err) {
            return res.status(err.status).send({ error: err.message });
        }

    },

    async loginWithRefreshToken(req, res) {
        try {
            const { id, refreshToken } = req.body;

            if (id == undefined || refreshToken == undefined)
                throw new StatusError(400, 'Undefined credentials');

            const user = await User.findOne({ where: { id } })

            if (!user) throw new StatusError(404, 'User not found');

            if (refreshToken !== user.refreshToken)
                throw new StatusError(401, 'Invalid credentials');


            //jwt token generation
            const token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: "1h"
            });

            const newRefreshToken = jwt.sign({}, authConfig.refreshSecret, {
                expiresIn: "1d"
            });

            await User.update({ refreshToken: newRefreshToken }, { where: { id: user.id } })

            res.status(200).json({ token, refreshToken });

        } catch (err) {
            return res.status(err.status).send({ error: err.message });
        }
    }
}