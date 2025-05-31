const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

router.post('/:appointmentId', roleMiddleware(['Mam']), sessionController.addSessionNote);
router.get('/:appointmentId', sessionController.getSessionNotesForAppointment);

module.exports = router;
