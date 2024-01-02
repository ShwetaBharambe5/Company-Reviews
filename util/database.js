const Sequelize = require('sequelize');

const sequelize = new Sequelize('reviewdb', 'root', 'root', {
    host:"localhost",
    dialect: "mysql"
});

module.exports = sequelize;