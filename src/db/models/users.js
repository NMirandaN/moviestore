const sequelize = require('../config');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(35),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN(),
        defaultValue: false
    }
}, {
    timestamps: false
});

module.exports = {
    User
}