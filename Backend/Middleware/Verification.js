const sendSuccess  = require('../Utils/RequestResponse');
const createError = require('http-errors');
const model = require('../Config/DataBase/Models');

const user = async (req, res, next) => {
    try {
        const { token } = req.body;

        if (!token) {
            return next(createError(500, 'Couldn\'t get a token'));
        }

        const user = await model.Tokens.findOne({
            where: {
                token: token,
            },
            raw: true,
        }).then(async (res) => {
            const userId = res.userId;

            return await model.Users.findOne({
                where: {
                    id: userId
                },
                raw: true
            })
        });

        if (!user) {
            return sendSuccess(res, 200, 'Verification failed', false);
        }

        delete user.password;

        return sendSuccess(res, 200, 'Verification passed', user);

    } catch (err) {
        return next(createError(500, 'Unknown error from user verification.'));
    }
}

const company = async (req, res, next) => {
    try {
        const { id } = req.body;

        await model.Company.findOne({
            where: {
                id: id,
            },
            raw: true,
        }).then((result) => {
            if (result) {
                return sendSuccess(res, 200, 'Verification passed', true);
            }

            return sendSuccess(res, 200, 'Verification failed', false);
        })

    } catch (err) {
        return next(createError(500, 'Unknown error from company verification.'));
    }
}

module.exports = { user, company }