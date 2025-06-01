const { body } = require('express-validator');

exports.createSessionNoteValidator = [
  body('appointmentId').isInt().withMessage('Appointment ID must be a number'),
  body('notes').notEmpty().withMessage('Session notes are required'),
  body('counsellorId').isInt().withMessage('Counsellor ID must be a number')
];
