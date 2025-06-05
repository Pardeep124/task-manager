const taskService = require('../services/task.service.js');
const { validationResult } = require('express-validator');

const getTaskList = async (req, res) => {
    try {
        const tasks = await taskService.getTasks();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {
        const task = await taskService.createTask(req.body);
        res.status(201).json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

const updateTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {
        const task = await taskService.updateTask(req.params.id, req.body);
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

const deleteTask = async (req, res) => {
    try {
        const deleted = await taskService.deleteTask(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Task not found" });
        res.json({ message: "Task deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    getTaskList,
    createTask,
    updateTask,
    deleteTask
}