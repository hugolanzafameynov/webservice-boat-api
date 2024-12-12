const express = require('express');
const fishingLogController = require('../controllers/fishingLogController');

const router = express.Router();

router.get('/', fishingLogController.getAllFishingLogs);
router.get('/:id', fishingLogController.getFishingLogById);
router.post('/', fishingLogController.createFishingLog);
router.put('/:id', fishingLogController.updateFishingLog);
router.delete('/:id', fishingLogController.deleteFishingLog);

module.exports = router;