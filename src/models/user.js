const {DataTypes} = require('sequelize');
const sequelize = require('../../config/database');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    postalCode: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    spokenLanguages: {
        type: DataTypes.STRING
    },
    photoUrl: {
        type: DataTypes.STRING
    },
    boatLicenseNumber: {
        type: DataTypes.STRING,
        validate: {
            is: /^[0-9]{8}$/
        }
    },
    insuranceNumber: {
        type: DataTypes.STRING,
        validate: {
            is: /^[a-zA-Z0-9]{12}$/
        }
    },
    status: {
        type: DataTypes.ENUM('individual', 'professional'),
        allowNull: false
    },
    companyName: {
        type: DataTypes.STRING
    },
    activityType: {
        type: DataTypes.ENUM('rental', 'fishing guide')
    },
    siretNumber: {
        type: DataTypes.STRING
    },
    registrationNumber: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'users',
    timestamps: false, // pour ajouter createdAt et updatedAt
});

module.exports = User;
