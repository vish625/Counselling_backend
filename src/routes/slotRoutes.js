const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

router.post('/', roleMiddleware(['Mam']), slotController.createSlot);
router.get('/mam', roleMiddleware(['Mam']), slotController.getSlotsForMam);
router.get('/available', slotController.getAvailableSlots);

module.exports = router;
