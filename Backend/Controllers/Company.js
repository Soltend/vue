const createError = require('http-errors');
const model = require('../Config/DataBase/Models');
const sendSuccess  = require('../Utils/RequestResponse');
const bcrypt = require("bcryptjs");

const getAll = async (req, res, next) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return next(createError(500, 'Unknown error'));
        }

        const getCompanyList = async (id) => {
            return await model.Company.findAll({
                where: {
                    userId: id,
                },
                raw: true,
            });
        };

        const getEmployees = async (id) => {
            return await model.Employees.findAll({
                where: {
                    userId: id,
                },
                raw: true,
            })
        };

        const filterCompany = (companies, employees) => {
            return companies.map(company => {
                delete company.services;
                delete company.userId;

                company.employess = employees.filter(employee => employee.companyId === company.id).length;
                return company
            })
        }

        Promise.all([
            getCompanyList(userId),
            getEmployees(userId),
        ]).then((result) => {
            const filteredCompanies = filterCompany(result[0], result[1]);

            return sendSuccess(res, 200, 'List of companies', filteredCompanies);
        })

    } catch (err) {
        return next(createError(500, 'Unknown error'));
    }
}

const remove = async (req, res, next) => {
    try {
        const { userId, companyId} = req.body;

        await model.Company.destroy({
            where: {
                id: companyId,
                userId: userId,
            }
        }).then(() => {
            return sendSuccess(res, 200, 'Remove company success', true);
        })
    } catch (err) {
        return next(createError(500, 'Unknown error'));
    }
}

const create = async (req, res, next) => {
    try {
        const { userId, main, types } = req.body;

        if (!userId || !main.name.value || !types.list.length) {
            return next(createError(500, 'Field validation error'));
        }

        await model.Company.create({
            userId: userId,
            name: main.name.value,
            web: main.web.value,
            type: {"types": types.list},
            services: {"services": []},
            address: 'in progress'
        }).then(() => {
            return sendSuccess(res, 200, 'Add new company successfully', true);
        })
    } catch (err) {
        return next(createError(500, 'Unknown error'));
    }
}

const getSingle = async (req, res, next) => {
    try {
        const { userId, companyId } = req.body;

        if (!userId || !companyId) {
            return next(createError(500, 'Unknown error'));
        }

        await model.Company.findOne({
            where: {
                id: companyId,
                userId: userId
            },
            raw: true,
        }).then((result) => {
            if (result) {
                return sendSuccess(res, 200, 'Company was founded', result);
            }

            return next(createError(500, 'Company not found'));
        })
    } catch (err) {
        return next(createError(500, 'Unknown error'));
    }
}

const edit = async (req, res, next) => {
    try {
        const { companyId, userId, main, types } = req.body;

        await model.Company.update({
            name: main.name.value,
            web: main.web.value,
            type: {"types": types.list},
        }, {
            where: {
                userId: userId,
                id: companyId,
            }
        }).then(() => {
            return sendSuccess(res, 200, 'Company was changed', true);
        })
    } catch (err) {
        return next(createError(500, 'Unknown error'));
    }
}

module.exports = { getAll, remove, create, getSingle, edit }