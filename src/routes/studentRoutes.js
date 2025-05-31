const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const rolesAllowed = ['HOD', 'Mam', 'Student'];

router.use(authMiddleware);
router.use(roleMiddleware(rolesAllowed));

router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentProfile);
router.put('/:id', studentController.updateStudentProfile);

module.exports = router;
