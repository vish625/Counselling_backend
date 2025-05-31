module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    status: { type: DataTypes.STRING, defaultValue: 'booked' }
  });
  return Appointment;
};
