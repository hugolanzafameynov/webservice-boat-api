const User = require("../models/user");
const {Op} = require("sequelize");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

/**
 * Get users with filters
 *
 * @param req
 * @param res
 * @return {Promise<*>}
 */
const getUsersWithFilters = async (req, res) => {
    try {
        const {
            title,
        } = req.query;

        let filter = {};

        if (name) {
            filter.title = {[Op.like]: `%${title}%`};
        }

        let include = [];

        const users = await User.findAll({
            where: filter,
            include: include,
        });

        if (users.length === 0) {
            return res.status(404).json({message: 'No users found with the specified filters.'});
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const [updated] = await User.update(req.body, {where: {id: userId}});

        if (!updated) {
            return res.status(404).json({message: 'User not found'});
        }

        const updatedUser = await User.findByPk(userId);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};


const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const deletedCount = await User.destroy({
            where: {id: userId}
        });

        if (deletedCount === 0) {
            return res.status(404).json({message: 'User not found'});
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getAllUsers,
    getUsersWithFilters,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};

