const model = require('../Config/DataBase/Models');
const keys = require('../Config/Keys');
const { verify } = require('jsonwebtoken');
const createError = require('http-errors');

const jwtCheck = async (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        verify(token, keys.jwt, (err) => {
            if (err) return next(createError(403, 'Forbidden access'));
        })

        await model.Tokens.findOne({
            where: {
                token: token
            },
            raw: true
        }).then(res => {
            !res ? next(createError(403, 'Forbidden access')) : next();
        })
    } else {
        return next(createError(403, 'Forbidden access'));
    }
}

module.exports = { jwtCheck }