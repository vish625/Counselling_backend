const { body } = require('express-validator');

exports.bookAppointmentValidator = [
  body('studentId').isInt().withMessage('Student ID must be a number'),
  body('slotId').isInt().withMessage('Slot ID must be a number'),
  body('issue').notEmpty().withMessage('Issue description is required')
];

exports.updateAppointmentValidator = [
  body('status')
    .optional()
    .isIn(['pending', 'confirmed', 'completed', 'cancelled'])
    .withMessage('Status must be: pending, confirmed, completed, or cancelled')
];
