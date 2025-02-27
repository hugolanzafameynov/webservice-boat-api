const FishingTrip = require("../models/fishingTrip");
const {Op} = require("sequelize");

const getAllFishingTrips = async (req, res) => {
    try {
        const fishingTrips = await FishingTrip.findAll();
        res.status(200).json(fishingTrips);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

/**
 * Get fishing trips with filters
 *
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const getFishingTripsWithFilters = async (req, res) => {
    try {
        const {
            title,
        } = req.query;

        let filter = {};

        if (title) {
            filter.title = {[Op.like]: `%${title}%`};
        }

        let include = [];

        const fishingTrips = await FishingTrip.findAll({
            where: filter,
            include: include,
        });

        if (fishingTrips.length === 0) {
            return res.status(404).json({message: 'No fishing trips found with the specified filters.'});
        }

        res.status(200).json(fishingTrips);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getFishingTripById = async (req, res) => {
    try {
        const fishingTripId = req.params.fishingTripId;
        const fishingTrip = await FishingTrip.findByPk(fishingTripId);

        if (!fishingTrip) {
            return res.status(404).json({message: 'fishingTrip not found'});
        }

        res.status(200).json(fishingTrip);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const createFishingTrip = async (req, res) => {
    try {
        const fishingTrip = await FishingTrip.create(req.body);
        res.status(201).json(fishingTrip);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const updateFishingTrip = async (req, res) => {
    try {
        const fishingTripId = req.params.fishingTripId;
        const [updated] = await FishingTrip.update(req.body, {where: {id: fishingTripId}});

        if (!updated) {
            return res.status(404).json({message: 'Fishing trip not found'});
        }

        const updatedFishingTrip = await FishingTrip.findByPk(fishingTripId);
        res.status(200).json(updatedFishingTrip);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const deleteFishingTrip = async (req, res) => {
    try {
        const fishingTripId = req.params.fishingTripId;
        const deletedCount = await FishingTrip.destroy({
            where: {id: fishingTripId}
        });

        if (deletedCount === 0) {
            return res.status(404).json({message: 'Fishing trip not found'});
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getAllFishingTrips,
    getFishingTripsWithFilters,
    getFishingTripById,
    createFishingTrip,
    updateFishingTrip,
    deleteFishingTrip,
};