// src/validators/studentValidator.js

const { body } = require('express-validator');

exports.studentProfileValidator = [
  body('userId').isInt().withMessage('User ID must be an integer'),
  body('name').notEmpty().withMessage('Name is required'),
  body('department').notEmpty().withMessage('Department is required'),
  body('year').isInt({ min: 1, max: 5 }).withMessage('Year must be between 1 and 5')
];
