const express = require('express');
const router = express.Router();

const { updateTaskValidation, createTaskValidation } = require('../validations/taskValidations.js');
const { getTaskList, createTask, updateTask, deleteTask } = require('../controller/task.controller.js');

router.get('/', getTaskList);
router.post('/', createTaskValidation, createTask);
router.put('/:id', updateTaskValidation, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
