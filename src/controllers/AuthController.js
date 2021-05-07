const bcrypt = require('bcryptjs');
const User = require('../models/User');
const StatusError = require('../errors/StatusError');

module.exports = {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (email == undefined || password == undefined)
                throw new StatusError(400, 'Email and/or password undefined');
            const user = await User.findOne({ where: { email: email } })
            if (!user) throw new StatusError(404, 'User not found');
            if (!bcrypt.compareSync(password, user.password))
                throw new StatusError(401, 'Invalid credentials');
            res.status(200).json({ token: "TOKEN" })
        } catch (err) {
            return res.status(err.status).send(err.message);
        }

    }
}