const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');
const Boat = require('../models/boat');
const Equipment = require('../models/equipment');

const BoatEquipment = sequelize.define('BoatEquipment', {
    boatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Boat,
            key: 'id',
        },
    },
    equipmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Equipment,
            key: 'id',
        },
    },
}, {
    tableName: 'boat_equipments',
    timestamps: false,
});

module.exports = BoatEquipment;
