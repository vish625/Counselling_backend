const db = require('../models');
const Appointment = db.Appointment;
const Slot = db.Slot;
const User = db.User;

exports.bookAppointment = async (req, res) => {
  try {
    const studentId = req.userId;
    const { slotId } = req.body;

    const slot = await Slot.findOne({ where: { id: slotId, isAvailable: true } });
    if (!slot) {
      return res.status(400).json({ message: 'Slot not available' });
    }

    const appointment = await Appointment.create({
      UserId: studentId,
      SlotId: slotId,
      status: 'booked'
    });

    await slot.update({ isAvailable: false });

    res.status(201).json({ message: 'Appointment booked', appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAppointmentsForUser = async (req, res) => {
  try {
    const userId = req.userId;
    const role = req.userRole;

    let whereCondition = {};
    if (role === 'Student') {
      whereCondition = { UserId: userId };
    } else if (role === 'Mam') {
      // Mam sees appointments in slots they created
      const slots = await Slot.findAll({ where: { UserId: userId } });
      const slotIds = slots.map(s => s.id);
      whereCondition = { SlotId: slotIds };
    }

    const appointments = await Appointment.findAll({
      where: whereCondition,
      include: [{ model: Slot }, { model: User, attributes: ['id', 'name', 'email'] }]
    });

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    appointment.status = status;
    await appointment.save();

    res.json({ message: 'Appointment status updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
