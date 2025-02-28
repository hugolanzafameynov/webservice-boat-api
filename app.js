const express = require('express');
const sequelize = require('./config/database');

const app = express();


// Database initialization
const User = require("./src/models/user");
const Boat = require("./src/models/boat");
const FishingLog = require("./src/models/fishingLog");
const Reservation = require("./src/models/reservation");
const FishingTrip = require("./src/models/fishingTrip");
const Equipment = require("./src/models/equipment");
const BoatEquipment = require("./src/models/boatEquipment");

User.hasMany(Boat, {foreignKey: 'userId', onDelete: 'CASCADE'});
User.hasMany(FishingTrip, {foreignKey: 'userId', onDelete: 'CASCADE'});
User.hasMany(FishingLog, {foreignKey: 'userId', onDelete: 'CASCADE'});
User.hasMany(Reservation, {foreignKey: 'userId', onDelete: 'CASCADE'});

sequelize.sync({alter: true})
    .then(() => {
        console.log('Tables synchronisées');
    })
    .catch(err => {
        console.log('Erreur de synchronisation', err);
    });

// Routes initialization
const userRoutes = require('./src/routes/userRoutes');
const boatRoutes = require('./src/routes/boatRoutes');
const fishingLogRoutes = require('./src/routes/fishingLogRoutes');
const reservationRoutes = require('./src/routes/reservationRoutes');
const fishingTripRoutes = require('./src/routes/fishingTripRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/v1/users', userRoutes);
app.use('/v1/boats', boatRoutes);
app.use('/v1/fishing-logs', fishingLogRoutes);
app.use('/v1/reservations', reservationRoutes);
app.use('/v1/fishing-trips', fishingTripRoutes);

// Database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connected!');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
