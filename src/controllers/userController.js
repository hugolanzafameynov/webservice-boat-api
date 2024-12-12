const user = require("../models/user");

const getAllUsers = async (req, res) => {
    try {
        const users = await user.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await user.findByPk(req.params.userId);
        if (!user) return res.status(404).json({message: 'User not found'});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const createUser = async (req, res) => {
    try {
        const user = await user.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await user.update(req.params.userId, req.body);
        if (!user) return res.status(404).json({message: 'User not found'});
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await user.destroy(req.params.userId);
        if (!user) return res.status(404).json({message: 'User not found'});
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};

