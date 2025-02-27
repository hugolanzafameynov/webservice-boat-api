const FishingLog = require("../models/fishingLog");
const {Op} = require("sequelize");

const getAllFishingLogs = async (req, res) => {
    try {
        const fishingLogs = await FishingLog.findAll();
        res.status(200).json(fishingLogs);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

/**
 * Get fishing logs with filters
 *
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const getFishingLogsWithFilters = async (req, res) => {
    try {
        const {
            fishName,
        } = req.query;

        let filter = {};

        if (fishName) {
            filter.fishName = {[Op.like]: `%${fishName}%`};
        }

        let include = [];

        const fishingLogs = await FishingLog.findAll({
            where: filter,
            include: include,
        });

        if (fishingLogs.length === 0) {
            return res.status(404).json({message: 'No fishing logs found with the specified filters.'});
        }

        res.status(200).json(fishingLogs);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getFishingLogById = async (req, res) => {
    try {
        const fishingLogId = req.params.fishingLogId;
        const fishingLog = await FishingLog.findByPk(fishingLogId);

        if (!fishingLog) {
            return res.status(404).json({message: 'FishingLog not found'});
        }

        res.status(200).json(fishingLog);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getFishingLogByIdAndUserId = async (req, res) => {
    try {
        const {userId, fishingLogId} = req.params;
        const fishingLog = await FishingLog.findOne({
            where: {id: fishingLogId, userId: userId}
        });

        if (!fishingLog) {
            return res.status(404).json({message: 'FishingLog not found'});
        }

        res.status(200).json(fishingLog);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


const createFishingLog = async (req, res) => {
    try {
        const fishingLog = await FishingLog.create(req.body);
        res.status(201).json(fishingLog);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const updateFishingLog = async (req, res) => {
    try {
        const fishingLogId = req.params.fishingLogId;
        const [updated] = await FishingLog.update(req.body, {where: {id: fishingLogId}});

        if (!updated) {
            return res.status(404).json({message: 'FishingLog not found'});
        }

        const updatedFishingLog = await FishingLog.findByPk(fishingLogId);
        res.status(200).json(updatedFishingLog);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const deleteFishingLog = async (req, res) => {
    try {
        const fishingLogId = req.params.fishingLogId;
        const deletedCount = await FishingLog.destroy({
            where: {id: fishingLogId}
        });

        if (deletedCount === 0) {
            return res.status(404).json({message: 'FishingLog not found'});
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getAllFishingLogs,
    getFishingLogsWithFilters,
    getFishingLogById,
    getFishingLogByIdAndUserId,
    createFishingLog,
    updateFishingLog,
    deleteFishingLog,
};
