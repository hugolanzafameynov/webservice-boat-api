const boat = require("../models/boat");

const getAllBoats = async (req, res) => {
    try {
        const boats = await boat.findAll();
        res.status(200).json(boats);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getBoatById = async (req, res) => {
    try {
        const boat = await boat.findByPk(req.params.boatId);
        if (!boat) return res.status(404).json({message: 'boat not found'});
        res.status(200).json(boat);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const createBoat = async (req, res) => {
    try {
        const boat = await boat.create(req.body);
        res.status(201).json(boat);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const updateBoat = async (req, res) => {
    try {
        const boat = await boat.update(req.params.boatId, req.body);
        if (!boat) return res.status(404).json({message: 'boat not found'});
        res.status(200).json(boat);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const deleteBoat = async (req, res) => {
    try {
        const boat = await boat.destroy(req.params.boatId);
        if (!boat) return res.status(404).json({message: 'boat not found'});
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getAllBoats,
    getBoatById,
    createBoat,
    updateBoat,
    deleteBoat,
};
