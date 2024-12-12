const fishingTrip = require("../models/fishingTrip");

const getAllFishingTrips = async (req, res) => {
    try {
        const fishingTrips = await fishingTrip.findAll();
        res.status(200).json(fishingTrips);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getFishingTripById = async (req, res) => {
    try {
        const fishingTrip = await fishingTrip.findByPk(req.params.fishingTripId);
        if (!fishingTrip) return res.status(404).json({message: 'fishingTrip not found'});
        res.status(200).json(fishingTrip);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const createFishingTrip = async (req, res) => {
    try {
        const fishingTrip = await fishingTrip.create(req.body);
        res.status(201).json(fishingTrip);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const updateFishingTrip = async (req, res) => {
    try {
        const fishingTrip = await fishingTrip.update(req.params.fishingTripId, req.body);
        if (!fishingTrip) return res.status(404).json({message: 'fishingTrip not found'});
        res.status(200).json(fishingTrip);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const deleteFishingTrip = async (req, res) => {
    try {
        const fishingTrip = await fishingTrip.destroy(req.params.fishingTripId);
        if (!fishingTrip) return res.status(404).json({message: 'fishingTrip not found'});
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getAllFishingTrips,
    getFishingTripById,
    createFishingTrip,
    updateFishingTrip,
    deleteFishingTrip,
};