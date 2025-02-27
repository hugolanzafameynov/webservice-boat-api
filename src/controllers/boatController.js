const Boat = require("../models/boat");
const {Op} = require("sequelize");

/**
 * Get all boats
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const getAllBoats = async (req, res) => {
    try {
        const boats = await Boat.findAll();
        res.status(200).json(boats);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

/**
 * Get boats with filters
 *
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const getBoatsWithFilters = async (req, res) => {
    try {
        const {
            name,
            band,
            yearOfManufacture,
            licenceType,
            boatType,
            deposit,
            maxCapacity,
            berths,
            dockingPort,
            engineType,
            enginePower,
        } = req.query;

        let filter = {};

        if (name) {
            filter.name = {[Op.like]: `%${name}%`};
        }

        if (band) {
            filter.band = {[Op.like]: band};
        }

        if (yearOfManufacture) {
            filter.yearOfManufacture = {[Op.eq]: yearOfManufacture};
        }

        if (licenceType) {
            filter.licenceType = {[Op.like]: licenceType};
        }

        if (boatType) {
            filter.boatType = {[Op.like]: boatType};
        }

        if (deposit) {
            filter.deposit = {[Op.gte]: deposit};
        }

        if (maxCapacity) {
            filter.maxCapacity = {[Op.gte]: maxCapacity};
        }

        if (berths) {
            filter.berths = {[Op.gte]: berths};
        }

        if (dockingPort) {
            filter.dockingPort = {[Op.like]: dockingPort};
        }

        if (engineType) {
            filter.engineType = {[Op.like]: engineType};
        }

        if (enginePower) {
            filter.enginePower = {[Op.gte]: enginePower};
        }

        let include = [];

        const boats = await Boat.findAll({
            where: filter,
            include: include,
        });

        if (boats.length === 0) {
            return res.status(404).json({message: 'No boats found with the specified filters.'});
        }

        res.status(200).json(boats);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

/**
 * Get boats with within a bounding box (minLat, maxLat, minLon, maxLon)
 *
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const getBoatsByBoundingBox = async (req, res) => {
    try {
        const {minLat, maxLat, minLon, maxLon} = req.query;

        if (!minLat || !maxLat || !minLon || !maxLon) {
            return res.status(400).json({message: 'Bounding box parameters (minLat, maxLat, minLon, maxLon) are required.'});
        }

        if (minLat > maxLat) {
            return res.status(400).json({message: 'minLat cannot be greater than maxLat.'});
        }

        if (minLon > maxLon) {
            return res.status(400).json({message: 'minLon cannot be greater than maxLon.'});
        }

        const boats = await Boat.findAll({
            where: {
                latitude: {
                    [Op.between]: [minLat, maxLat],
                },
                longitude: {
                    [Op.between]: [minLon, maxLon],
                }
            }
        });

        if (boats.length === 0) {
            return res.status(404).json({message: 'No boats found in the specified area.'});
        }

        res.status(200).json(boats);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


/**
 * Get boat by id
 *
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const getBoatById = async (req, res) => {
    try {
        const boatId = req.params.boatId;
        const boat = await Boat.findByPk(boatId);

        if (!boat) {
            return res.status(404).json({message: 'boat not found'});
        }

        res.status(200).json(boat);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

/**
 * Create a boat
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 */
const createBoat = async (req, res) => {
    try {
        const boat = await Boat.create(req.body);
        res.status(201).json(boat);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

/**
 * Update a boat
 *
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const updateBoat = async (req, res) => {
    try {
        const boatId = req.params.boatId;
        const boat = await Boat.update(req.body, {where: {id: boatId}});

        if (!boat) {
            return res.status(404).json({message: 'boat not found'});
        }

        res.status(200).json(boat);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

/**
 * Delete a boat
 *
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const deleteBoat = async (req, res) => {
    try {
        const boatId = req.params.boatId;
        const deletedCount = await Boat.destroy({
            where: {id: boatId}
        });

        if (deletedCount === 0) {
            return res.status(404).json({message: 'Boat not found'});
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getAllBoats,
    getBoatsWithFilters,
    getBoatsByBoundingBox,
    getBoatById,
    createBoat,
    updateBoat,
    deleteBoat,
};
