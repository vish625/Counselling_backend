const { body } = require('express-validator');

exports.createSlotValidator = [
  body('date').isISO8601().withMessage('Valid date is required (YYYY-MM-DD)'),
  body('startTime').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Valid start time (HH:MM) is required'),
  body('endTime').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Valid end time (HH:MM) is required'),
  body('counsellorId').isInt().withMessage('Counsellor ID must be a number')
];
