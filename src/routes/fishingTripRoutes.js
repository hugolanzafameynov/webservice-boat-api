const express = require('express');
const fishingTripController = require('../controllers/fishingTripController');

const router = express.Router();

router.get('/', fishingTripController.getAllFishingTrips);
router.get('/filters', fishingTripController.getFishingTripsWithFilters);
router.get('/:fishingTripId', fishingTripController.getFishingTripById);
router.post('/', fishingTripController.createFishingTrip);
router.put('/:fishingTripId', fishingTripController.updateFishingTrip);
router.delete('/:fishingTripId', fishingTripController.deleteFishingTrip);

module.exports = router;