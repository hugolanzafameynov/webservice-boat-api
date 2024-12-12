const { Sequelize } = require('sequelize');

// Connexion à la base de données
const sequelize = new Sequelize('nom_de_la_base', 'nom_utilisateur', 'mot_de_passe', {
    host: 'localhost', // Adresse de votre serveur MySQL
    dialect: 'mysql',  // Type de base de données
});

module.exports = sequelize;
