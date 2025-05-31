const db = require('../models');
const Appointment = db.Appointment;
const Slot = db.Slot;
const User = db.User;
const Role = db.Role;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getSummaryReport = async (req, res) => {
  try {
    if (req.userRole !== 'HOD') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Example: Number of appointments per Mam, status-wise counts
    const report = await Appointment.findAll({
      attributes: [
        [Sequelize.col('Slot.User.name'), 'MamName'],
        'status',
        [Sequelize.fn('COUNT', Sequelize.col('Appointment.id')), 'count']
      ],
      include: [
        {
          model: Slot,
          attributes: [],
          include: [{ model: User, attributes: ['name'] }]
        }
      ],
      group: ['Slot.User.name', 'status']
    });

    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
