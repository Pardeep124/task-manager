const Task = require("../models/Task");

const findAll = async () => {
    return Task.find().sort({ createdAt: -1 });
};

const create = async (data) => {
    return Task.create(data);
};

const updateById = async (id, data) => {
    return Task.findByIdAndUpdate(id, data, { new: true });
};

const deleteById = async (id) => {
    return Task.findByIdAndDelete(id);
};

module.exports = {
    findAll,
    create,
    updateById,
    deleteById,
};
