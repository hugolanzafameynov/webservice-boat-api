const reservation = require("../models/reservation");

const getAllReservations = async (req, res) => {
    try {
        const reservations = await reservation.findAll();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getReservationById = async (req, res) => {
    try {
        const reservation = await reservation.findByPk(req.params.reservationId);
        if (!reservation) return res.status(404).json({message: 'reservation not found'});
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const createReservation = async (req, res) => {
    try {
        const reservation = await reservation.create(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const updateReservation = async (req, res) => {
    try {
        const reservation = await reservation.update(req.params.reservationId, req.body);
        if (!reservation) return res.status(404).json({message: 'reservation not found'});
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const deleteReservation = async (req, res) => {
    try {
        const reservation = await reservation.destroy(req.params.reservationId);
        if (!reservation) return res.status(404).json({message: 'reservation not found'});
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getAllReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation,
};