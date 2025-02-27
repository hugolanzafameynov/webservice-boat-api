require('dotenv').config(); // Charge les variables d'environnement

const { Sequelize } = require('sequelize');

// Connexion à la base de données avec les variables d'environnement
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
    }
);

module.exports = sequelize;
