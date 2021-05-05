const sequelice = require('../config');
const { DataTypes, Sequelize } = require('sequelize');

const Movie_Rent = sequelice.define('Movie_Rent', {
    dateRent: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW
    },
    dateReturn: DataTypes.DATEONLY,
    penalty: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00
    },
    total: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00
    },
    isReturned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
});

const Rent_Configuration = sequelice.define('Rent_Configuration', {
    dailyPenaltyRent: {
        type: DataTypes.DOUBLE,
        defaultValue: 1.00
    },
    maxDaysToRent: {
        type: DataTypes.INTEGER,
        defaultValue: 10
    }
}, {
    timestamps: false
});

const Rent_Detail = sequelice.define('Rent_Detail', {
    quantity: DataTypes.INTEGER,
    price: DataTypes.DOUBLE
}, {
    timestamps: false
});

const Movie_Sale = sequelice.define('Movie_Sale', {
    date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.Now
    },
    total: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00
    }
}, {
    timestamps: false
});

const Sale_Detail = sequelice.define('Sale_Detail', {
    quantity: DataTypes.INTEGER,
    price: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00
    }
}, {
    timestamps: false
});

const Movement_Log = sequelice.define('Movement_Log', {
    date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    type: DataTypes.STRING(10),
    total: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00
    },
    movementId: DataTypes.INTEGER
})

module.exports = {
    Movie_Rent,
    Rent_Configuration,
    Rent_Detail,
    Movie_Sale,
    Sale_Detail,
    Movement_Log
};