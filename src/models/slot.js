module.exports = (sequelize, DataTypes) => {
  const Slot = sequelize.define('Slot', {
    date: { type: DataTypes.DATEONLY, allowNull: false },
    startTime: { type: DataTypes.TIME, allowNull: false },
    endTime: { type: DataTypes.TIME, allowNull: false },
    isAvailable: { type: DataTypes.BOOLEAN, defaultValue: true }
  });
  return Slot;
};
