const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

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
    startDate: {
        type: DataTypes.ARRAY(DataTypes.DATEONLY),
        allowNull: false,
    },
    endDate: {
        type: DataTypes.ARRAY(DataTypes.DATEONLY),
        allowNull: false,
    },
    departureTimes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    endTimes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
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
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    boatId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'fishing_trips',
    timestamps: true, // Ajoute createdAt et updatedAt
});

module.exports = FishingTrip;
