const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generator = require('generate-password');
const createError = require('http-errors');

const model = require('../Config/DataBase/Models');
const keys = require('../Config/Keys');
const sendSuccess  = require('../Utils/RequestResponse');
// const mailer = require('../Utils/mailer');

const auth = async (req, res, next) => {
    try {
        const { email, password} = req.body;

        if (!email.value || !password.value) {
            return next(createError(401, 'Field validation error'));
        }

        const user = await model.Users.findOne({
            where: {
                email: email.value,
            },
            raw: true,
        })

        if (!user || !bcrypt.compareSync(password.value, user.password)) {
            return next(createError(401, 'Incorrect auth'));
        }

        delete user.password;

        const accessToken = jwt.sign({
            id: user.id,
            role: user.role
        }, keys.jwt);

        await model.Tokens.create({
            userId: user.id,
            token: accessToken
        }).then(() => {
            return sendSuccess(res, 200, 'Login successfully', {
                user,
                token: accessToken
            })
        })
    } catch (err) {
        return next(createError(500, 'Unknown error'));
    }
}

const registration = async (req, res, next) => {
    try {
        const { email, password, name} = req.body;

        if (!email.value || !password.value || !name.value) {
            return next(createError(401, 'Field validation error'));
        }

        const user = await model.Users.findOne({
            where: {
                email: email.value,
            },
            raw: true
        })

        if (user) {
            return next(createError(401, 'User already exists'));
        }

        await model.Users.create({
            email: email.value,
            password: bcrypt.hashSync(password.value, 10),
            name: name.value,
        }).then(() => {
            // TODO: Сделать отправку письма о регистрации на почту
            return sendSuccess(res, 200, 'Registration completed successfully', true)
        })
    } catch (err) {
        console.log(err)
        return next(createError(500, 'Unknown error'));
    }
}

const recovery = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email.value) {
            return next(createError(401, 'Field validation error'));
        }

        const user = await model.Users.findOne({
            where: {
                email: email.value
            },
            raw: true
        })

        if (!user) {
            return next(createError(401, 'Cant found this user'));
        }

        await model.Tokens.destroy({
            where: {
                userId: user.id
            }
        })

        const password = generator.generate({
            length: 10,
            numbers: true
        });

        await model.Users.update({
            password: bcrypt.hashSync(password, 10)
        }, {
            where: {
                id: user.id
            }
        }).then(() => {
            // TODO: Сделать отправку письма с новым паролем на почту
            return sendSuccess(res, 200, 'New password sent to email', true);
        })
    } catch (err) {
        return next(createError(500, 'Unknown error'));
    }
}

const logout = async (req, res, next) => {
    try {
        const { userId, token } = req.body;

        await model.Tokens.destroy({
            where: {
                userId: userId,
                token: token
            }
        }).then(() => {
            return sendSuccess(res, 200, 'Logged out', true);
        })
    } catch (err) {
        return next(createError(500, 'Unknown error'));
    }
}

module.exports = { auth, registration, recovery, logout }