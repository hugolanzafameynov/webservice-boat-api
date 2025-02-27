const Reservation = require("../models/reservation");
const {Op} = require("sequelize");

const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

/**
 * Get reservations with filters
 *
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const getReservationsWithFilters = async (req, res) => {
    try {
        const {
            totalPrice,
        } = req.query;

        let filter = {};

        if (totalPrice) {
            filter.totalPrice = {[Op.eq]: totalPrice};
        }

        let include = [];

        const reservations = await Reservation.findAll({
            where: filter,
            include: include,
        });

        if (reservations.length === 0) {
            return res.status(404).json({message: 'No reservations found with the specified filters.'});
        }

        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getReservationById = async (req, res) => {
    try {
        const reservationId = req.params.reservationId;
        const reservation = await Reservation.findByPk(reservationId);

        if (!reservation) {
            return res.status(404).json({message: 'reservation not found'});
        }

        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const createReservation = async (req, res) => {
    try {
        const reservation = await Reservation.create(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const updateReservation = async (req, res) => {
    try {
        const reservationId = req.params.reservationId;
        const [updated] = await Reservation.update(req.body, {where: {id: reservationId}});

        if (!updated) {
            return res.status(404).json({message: 'reservation not found'});
        }

        const updatedReservation = await Reservation.findByPk(reservationId);
        res.status(200).json(updatedReservation);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const deleteReservation = async (req, res) => {
    try {
        const reservationId = req.params.reservationId;
        const deletedCount = await Reservation.destroy({
            where: {id: reservationId}
        });

        if (deletedCount === 0) {
            return res.status(404).json({message: 'Reservation not found'});
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getAllReservations,
    getReservationsWithFilters,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation,
};