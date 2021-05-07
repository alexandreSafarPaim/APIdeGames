const StatusError = require('../errors/StatusError');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) throw new StatusError(401, 'No token provided');

        const parts = authHeader.split(' ');
        if (!parts === 2) throw new StatusError(401, 'Token Error');

        const [scheme, token] = parts;
        if (!~/^Bearer$/i.test(scheme)) {
            throw new StatusError(401, 'Token malformatted');
        }

        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) throw new StatusError(401, 'Invalid token');

            req.userId = decoded.id;
            return next();
        })

    } catch (err) {
        return res.status(err.status).send({ error: err.message });
    }
}