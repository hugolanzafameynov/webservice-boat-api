const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./user');
const FishingTrip = require("./fishingTrip");

const Reservation = sequelize.define('Reservation', {
    reservationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    reservedSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    tripId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: FishingTrip,
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
    tableName: 'reservations',
    timestamps: false, // Ajoute createdAt et updatedAt
});

module.exports = Reservation;
