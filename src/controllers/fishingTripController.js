const FishingTrip = require("../models/fishingTrip");
const User = require("../models/user");
const Boat = require("../models/boat");
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

        const fishingTrips = await FishingTrip.findAll({
            where: filter,
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
        // check if user exists
        const {userId} = req.body;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({error: "User not found."});
        }

        // check if the user owns at least one boat
        const boats = await Boat.findAll({ where: { userId } });

        if (boats.length === 0) {
            return res.status(403).json({ error: "You must own at least one boat to create this fishing trip." });
        }

        // check if boat exists
        const {boatId} = req.body;
        const boat = await Boat.findByPk(boatId);

        if (!boat) {
            return res.status(404).json({error: "Boat not found."});
        }

        // create fishing trip
        const fishingTrip = await FishingTrip.create(req.body);
        res.status(201).json(fishingTrip);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const updateFishingTrip = async (req, res) => {
    try {
        // check if user exists
        const {userId} = req.body;

        if (userId) {
            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({error: "User not found."});
            }
        }

        // check if boat exists
        const {boatId} = req.body;

        if (boatId) {
            const boat = await User.findByPk(boatId);

            if (!boat) {
                return res.status(404).json({error: "Boat not found."});
            }
        }

        const fishingTripId = req.params.fishingTripId;
        const [updated] = await FishingTrip.update(req.body, {where: {id: fishingTripId}});

        if (!updated) {
            return res.status(404).json({message: 'Fishing trip not found or not modified'});
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