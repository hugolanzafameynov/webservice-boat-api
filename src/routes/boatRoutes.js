const express = require('express');
const boatController = require('../controllers/boatController');

const router = express.Router();

router.get('/', boatController.getAllBoats);
router.get('/:id', boatController.getBoatById);
router.post('/', boatController.createBoat);
router.put('/:id', boatController.updateBoat);
router.delete('/:id', boatController.deleteBoat);

module.exports = router;