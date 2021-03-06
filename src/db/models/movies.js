const sequelize = require('../config');
const { DataTypes, Sequelize } = require('sequelize');

const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING(100),
    description: DataTypes.TEXT,
    stock: DataTypes.INTEGER,
    rentalPrice: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00
    },
    salePrice: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00
    },
    availability: DataTypes.BOOLEAN,
    ranking: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    image: DataTypes.STRING(100)
}, {
    timestamps: false
});

const Log_Movie_Price = sequelize.define('Log_Movie_Price', {
    date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    rentalPrice: DataTypes.DOUBLE,
    salePrice: DataTypes.DOUBLE,
}, {
    timestamps: false
});

const Like_Movie = sequelize.define('Like_Movie', {});

module.exports = {
    Movie,
    Log_Movie_Price,
    Like_Movie
};