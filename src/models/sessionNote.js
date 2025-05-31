module.exports = (sequelize, DataTypes) => {
  const SessionNote = sequelize.define('SessionNote', {
    notes: { type: DataTypes.TEXT, allowNull: false }
  });
  return SessionNote;
};
