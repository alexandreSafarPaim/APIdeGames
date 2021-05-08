const StatusError = require('../errors/StatusError');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

//authentication middleware with jwt
//checks are done to decrease the memory usage of the server during the jwt.verify () method
module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        //token format verification
        if (!authHeader) throw new StatusError(401, 'No token provided');
        const parts = authHeader.split(' ');
        if (!parts === 2) throw new StatusError(401, 'Token Error');
        const [scheme, token] = parts;
        if (!~/^Bearer$/i.test(scheme)) {
            throw new StatusError(401, 'Token malformatted');
        }

        //jwt token verification
        jwt.verify(token, authConfig.secret, (err, data) => {
            if (err) throw new StatusError(401, 'Invalid token');

            res.userId = data.id;
            next();
        })

    } catch (err) {
        return res.status(err.status).send({ error: err.message });
    }
}