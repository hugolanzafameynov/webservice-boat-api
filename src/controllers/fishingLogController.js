const fishingLog = require("../models/fishingLog");

const getAllFishingLogs = async (req, res) => {
    try {
        const fishingLogs = await fishingLog.findAll();
        res.status(200).json(fishingLogs);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getFishingLogById = async (req, res) => {
    try {
        const fishingLog = await fishingLog.findByPk(req.params.fishingLogId);
        if (!fishingLog) return res.status(404).json({message: 'fishingLog not found'});
        res.status(200).json(fishingLog);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const createFishingLog = async (req, res) => {
    try {
        const fishingLog = await fishingLog.create(req.body);
        res.status(201).json(fishingLog);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const updateFishingLog = async (req, res) => {
    try {
        const fishingLog = await fishingLog.update(req.params.fishingLogId, req.body);
        if (!fishingLog) return res.status(404).json({message: 'fishingLog not found'});
        res.status(200).json(fishingLog);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const deleteFishingLog = async (req, res) => {
    try {
        const fishingLog = await fishingLog.destroy(req.params.fishingLogId);
        if (!fishingLog) return res.status(404).json({message: 'fishingLog not found'});
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getAllFishingLogs,
    getFishingLogById,
    createFishingLog,
    updateFishingLog,
    deleteFishingLog,
};
