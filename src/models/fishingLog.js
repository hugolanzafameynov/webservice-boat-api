const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const FishingLog = sequelize.define('FishingLog', {
    fishName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fishPhotoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true,
        },
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    size: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    fishingLocation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fishingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    releasedFish: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    tableName: 'fishing_logs',
    timestamps: true, // Ajoute createdAt et updatedAt
});

module.exports = FishingLog;
