const db = require('../models');
const SessionNote = db.SessionNote;
const Appointment = db.Appointment;

exports.addSessionNote = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { notes } = req.body;

    if (!notes) {
      return res.status(400).json({ message: 'Notes cannot be empty' });
    }

    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Only Mam who owns the slot can add notes
    if (req.userRole !== 'Mam') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Check if slot belongs to this Mam
    if (appointment.SlotId) {
      const slot = await appointment.getSlot();
      if (slot.UserId !== req.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
    }

    let sessionNote = await SessionNote.findOne({ where: { AppointmentId: appointmentId } });
    if (sessionNote) {
      sessionNote.notes = notes;
      await sessionNote.save();
    } else {
      sessionNote = await SessionNote.create({ AppointmentId: appointmentId, notes });
    }

    res.json({ message: 'Session note added/updated', sessionNote });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSessionNotesForAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const sessionNote = await SessionNote.findOne({ where: { AppointmentId: appointmentId } });
    if (!sessionNote) {
      return res.status(404).json({ message: 'No session notes found' });
    }
    res.json(sessionNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
