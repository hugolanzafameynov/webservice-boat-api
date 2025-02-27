const express = require('express');
const reservationController = require('../controllers/reservationController');

const router = express.Router();

router.get('/', reservationController.getAllReservations);
router.get('/filters', reservationController.getReservationsWithFilters);
router.get('/:reservationId', reservationController.getReservationById);
router.post('/', reservationController.createReservation);
router.put('/:reservationId', reservationController.updateReservation);
router.delete('/:reservationId', reservationController.deleteReservation);

module.exports = router;