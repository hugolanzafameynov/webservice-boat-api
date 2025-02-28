const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./user');
const Boat = require('./boat');

const FishingTrip = sequelize.define('FishingTrip', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    practicalInfo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tripType: {
        type: DataTypes.ENUM('daily', 'recurring'),
        allowNull: false,
    },
    pricingType: {
        type: DataTypes.ENUM('global', 'per person'),
        allowNull: false,
    },
    startDates: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    endDates: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    departureTimes: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    endTimes: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    passengers: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    boatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Boat,
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    tableName: 'fishing_trips',
    timestamps: false, // Ajoute createdAt et updatedAt
});

module.exports = FishingTrip;
