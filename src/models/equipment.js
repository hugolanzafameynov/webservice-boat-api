const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');
const Boat = require('./boat');

const Equipment = sequelize.define('Equipment', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'equipments',
    timestamps: false,
});

module.exports = Equipment;
