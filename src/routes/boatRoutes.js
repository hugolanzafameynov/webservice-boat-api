const express = require('express');
const boatController = require('../controllers/boatController');

const router = express.Router();

router.get('/', boatController.getAllBoats);
router.get('/filters', boatController.getBoatsWithFilters);
router.get('/bounding-box', boatController.getBoatsByBoundingBox);
router.get('/:boatId', boatController.getBoatById);
router.post('/', boatController.createBoat);
router.put('/:boatId', boatController.updateBoat);
router.delete('/:boatId', boatController.deleteBoat);

module.exports = router;