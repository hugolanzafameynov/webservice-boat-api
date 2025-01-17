const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');
const boat = require('./boat');

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

Equipment.belongsToMany(boat, {
    through: 'BoatEquipments',
    foreignKey: 'equipmentId',
    otherKey: 'boatId',
});

module.exports = Equipment;
