const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');

const Reservation = sequelize.define('Reservation', {
    tripId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
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
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'reservations',
    timestamps: false, // Ajoute createdAt et updatedAt
});

module.exports = Reservation;
