const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

router.post('/book', roleMiddleware(['Student']), appointmentController.bookAppointment);
router.get('/', appointmentController.getAppointmentsForUser);
router.put('/:appointmentId/status', roleMiddleware(['Mam', 'HOD']), appointmentController.updateAppointmentStatus);

module.exports = router;
