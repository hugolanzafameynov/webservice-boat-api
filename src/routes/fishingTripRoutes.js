const express = require('express');
const fishingTripController = require('../controllers/fishingTripController');

const router = express.Router();

router.get('/', fishingTripController.getAllFishingTrips);
router.get('/:id', fishingTripController.getFishingTripById);
router.post('/', fishingTripController.createFishingTrip);
router.put('/:id', fishingTripController.updateFishingTrip);
router.delete('/:id', fishingTripController.deleteFishingTrip);

module.exports = router;