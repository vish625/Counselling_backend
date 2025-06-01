const { query } = require('express-validator');

exports.reportQueryValidator = [
  query('from').optional().isISO8601().withMessage('From date must be valid'),
  query('to').optional().isISO8601().withMessage('To date must be valid')
];
