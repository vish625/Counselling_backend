const db = require('../models');
const Slot = db.Slot;
const User = db.User;

exports.createSlot = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;
    const mamId = req.userId;

    if (!date || !startTime || !endTime) {
      return res.status(400).json({ message: 'Missing slot details' });
    }

    const slot = await Slot.create({
      date,
      startTime,
      endTime,
      UserId: mamId,
      isAvailable: true
    });

    res.status(201).json({ message: 'Slot created', slot });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSlotsForMam = async (req, res) => {
  try {
    const mamId = req.userId;
    const slots = await Slot.findAll({ where: { UserId: mamId } });
    res.json(slots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const slots = await Slot.findAll({ where: { isAvailable: true } });
    res.json(slots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
