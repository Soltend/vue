const { Sequelize } = require('sequelize');

const database = 'usluga';
const username = 'usluga';
const password = 'eR7hS2yL4xfB2k';

const sequelize = new Sequelize(database, username, password, {
    host: '62.173.139.235',
    dialect: 'mysql',
    pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle: 1000,
    },
    logging: false,
    define: {
        timestamps: false
    }
})


module.exports = sequelize;