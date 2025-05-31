const db = require('../models');
const User = db.User;
const StudentProfile = db.StudentProfile;

exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.findAll({
      where: { RoleId: req.rolesMap.Student },
      include: StudentProfile,
      attributes: ['id', 'name', 'email']
    });
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStudentProfile = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await User.findOne({
      where: { id: studentId, RoleId: req.rolesMap.Student },
      include: StudentProfile,
      attributes: ['id', 'name', 'email']
    });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateStudentProfile = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { department, year, phone } = req.body;

    const student = await User.findOne({ where: { id: studentId, RoleId: req.rolesMap.Student } });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    let profile = await StudentProfile.findOne({ where: { UserId: studentId } });
    if (!profile) {
      profile = await StudentProfile.create({
        UserId: studentId,
        department,
        year,
        phone
      });
    } else {
      await profile.update({ department, year, phone });
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
