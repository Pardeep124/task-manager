const taskRepository = require("../repositories/task.repository");

const getTasks = async () => {
    return taskRepository.findAll();
};

const createTask = async (data) => {
    return taskRepository.create(data);
};

const updateTask = async (id, data) => {
    return taskRepository.updateById(id, data);
};

const deleteTask = async (id) => {
    return taskRepository.deleteById(id);
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};
