const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const userRoutes = require('./src/routes/userRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/v1/users', userRoutes);
//app.use('/v1/boats', boatRoutes);
//app.use('/v1/fishing-logs', fishingLogRoutes);
//app.use('/v1/reservations', reservationRoutes);
//app.use('/v1/fishing-trips', fishingTripRoutes);

sequelize.sync({ force: false })
    .then(() => console.log('Database connected and models synchronized'))
    .catch((err) => console.error('Database connection failed:', err));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
