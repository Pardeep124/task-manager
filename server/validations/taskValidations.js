const { body } = require('express-validator');

const createTaskValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('dueDate').optional().isISO8601().toDate().withMessage('Invalid due date'),
  body('priority')
    .optional()
    .isIn(['High', 'Medium', 'Low'])
    .withMessage('Priority must be High, Medium or Low'),
  body('tags').optional().isArray().withMessage('Tags must be an array of strings'),
];

const updateTaskValidation = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('dueDate').optional().isISO8601().toDate().withMessage('Invalid due date'),
  body('priority')
    .optional()
    .isIn(['High', 'Medium', 'Low'])
    .withMessage('Priority must be High, Medium or Low'),
  body('tags').optional().isArray().withMessage('Tags must be an array of strings'),
];

module.exports = {
  createTaskValidation,
  updateTaskValidation
}
