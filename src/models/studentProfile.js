module.exports = (sequelize, DataTypes) => {
  const StudentProfile = sequelize.define('StudentProfile', {
    department: { type: DataTypes.STRING },
    year: { type: DataTypes.INTEGER },
    phone: { type: DataTypes.STRING }
  });
  return StudentProfile;
};
