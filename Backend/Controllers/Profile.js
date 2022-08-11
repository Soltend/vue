const createError = require('http-errors');
const model = require('../Config/DataBase/Models');
const sendSuccess  = require('../Utils/RequestResponse');
const bcrypt = require("bcryptjs");

const update = async (req, res, next) => {
    try {
        const { userId, user, contacts, password } = req.body;

        if (!userId || !user.name.value || !contacts.email.value) {
            return next(createError(500, 'Field validation error'));
        }

        const payload = {
            name: user.name.value,
            surname: user.surname.value,
            middlename: user.middlename.value,
            email: contacts.email.value,
            phone: contacts.phone.value
        }

        const passwordPayload = {
            old: password.old.value,
            new: password.new.value,
        }

        if (!passwordPayload.old || !passwordPayload.new) {
            await model.Users.update({
                ...payload,
            }, {
                where: {
                    id: userId,
                }
            }).then(() => {
                return sendSuccess(res, 200, 'User profile was changed', true);
            })
        }

        if (passwordPayload.old || passwordPayload.new) {
            const user = await model.Users.findOne({
                where: {
                    id: userId,
                },
                raw: true,
            })

            if (!user || !bcrypt.compareSync(passwordPayload.old, user.password)) {
                return next(createError(500, 'Incorrect password from profile'));
            }

            await model.Users.update({
                ...payload,
                password: bcrypt.hashSync(passwordPayload.new, 10),
            }, {
                where: {
                    id: userId,
                }
            }).then(() => {
                return sendSuccess(res, 200, 'User profile was changed', true);
            })
        }
    } catch (err) {
        return next(createError(500, 'Unknown error'));
    }
}

module.exports = { update }