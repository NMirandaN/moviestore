const sequelize = require('../config');
const { DataTypes } = require('sequelize');

const Role = sequelize.define('Role', {
    name: DataTypes.STRING(30),
}, {
    timestamps: false
});

const User = sequelize.define('User', {
    name: DataTypes.STRING(100),
    lastName: DataTypes.STRING(100),
    username: DataTypes.STRING(35),
    password: DataTypes.STRING(100),
}, {
    timestamps: false
});

module.exports = {
    Role,
    User
};