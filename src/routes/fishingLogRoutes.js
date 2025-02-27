const express = require('express');
const fishingLogController = require('../controllers/fishingLogController');

const router = express.Router();

router.get('/', fishingLogController.getAllFishingLogs);
router.get('/filters', fishingLogController.getFishingLogsWithFilters);
router.get('/:fishingLogId', fishingLogController.getFishingLogById);
router.post('/', fishingLogController.createFishingLog);
router.put('/:fishingLogId', fishingLogController.updateFishingLog);
router.delete('/:fishingLogId', fishingLogController.deleteFishingLog);

module.exports = router;