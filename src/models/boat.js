const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Boat = sequelize.define('Boat', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    yearOfManufacture: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    photoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true,
        },
    },
    licenseType: {
        type: DataTypes.ENUM('coastal', 'inland'),
        allowNull: false,
    },
    boatType: {
        type: DataTypes.ENUM('open', 'cabin', 'catamaran', 'sailboat', 'jet ski', 'canoe'),
        allowNull: false,
    },
    equipment: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Array de strings pour les équipements
        allowNull: true,
    },
    deposit: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    maxCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    berths: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    dockingPort: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    engineType: {
        type: DataTypes.ENUM('diesel', 'gasoline', 'none'),
        allowNull: false,
    },
    enginePower: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'boats',
    timestamps: true, // Ajout des colonnes createdAt et updatedAt
});

module.exports = Boat;
