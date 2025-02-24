const express = require('express');
const sequelize = require('./config/database');

const app = express();

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Tables synchronisées');
    })
    .catch(err => {
        console.log('Erreur de synchronisation', err);
    });

const userRoutes = require('./src/routes/userRoutes');
// const boatRoutes = require('./src/routes/boatRoutes');
// const fishingLogRoutes = require('./src/routes/fishingLogRoutes');
// const reservationRoutes = require('./src/routes/reservationRoutes');
// const fishingTripRoutes = require('./src/routes/fishingTripRoutes');

// const Boat = require("./src/models/boat");
// const Equipment = require("./src/models/equipment");
//
// Equipment.belongsToMany(Boat, {
//     through: 'BoatEquipments'
// });
//
// Boat.belongsToMany(Equipment, {
//     through: 'BoatEquipments'
// });

// Middleware
app.use(express.json());

// Routes
app.use('/v1/users', userRoutes);
// app.use('/v1/boats', boatRoutes);
// app.use('/v1/fishing-logs', fishingLogRoutes);
// app.use('/v1/reservations', reservationRoutes);
// app.use('/v1/fishing-trips', fishingTripRoutes);

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
