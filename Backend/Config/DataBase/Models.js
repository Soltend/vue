const Sequelize = require('sequelize');
const sequelize = require('./Config');

const Users = sequelize.define('Users', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    surname: {
        type: Sequelize.STRING
    },
    middlename: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
});

const Tokens = sequelize.define('Tokens', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    freezeTableName: true
});

const Company = sequelize.define('Company', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    userId: {
        type: Sequelize.INTEGER,
    },
    name: {
        type: Sequelize.STRING,
    },
    type: {
        type: Sequelize.JSON,
    },
    services: {
        type: Sequelize.JSON,
    },
    address: {
        type: Sequelize.STRING,
    },
    web: {
        type: Sequelize.STRING,
    },
    subscribe: {
        type: Sequelize.DATE,
    }
}, {
    freezeTableName: true
});

const Employees = sequelize.define('Employees', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    userId: {
        type: Sequelize.INTEGER,
    },
    companyId: {
        type: Sequelize.INTEGER,
    },
    officeId: {
        type: Sequelize.INTEGER,
    },
    name: {
        type: Sequelize.STRING,
    },
    surname: {
        type: Sequelize.STRING,
    },
    middlename: {
        type: Sequelize.STRING,
    },
}, {
    freezeTableName: true
});

module.exports = { Users, Tokens, Company, Employees };