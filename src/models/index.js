const Sequelize = require('sequelize');
const sequelize = new Sequelize('your_db_name', 'your_db_user', 'your_db_password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Role = require('./role')(sequelize, Sequelize);
db.StudentProfile = require('./studentProfile')(sequelize, Sequelize);
db.Slot = require('./slot')(sequelize, Sequelize);
db.Appointment = require('./appointment')(sequelize, Sequelize);
db.SessionNote = require('./sessionNote')(sequelize, Sequelize);

// Associations
db.Role.hasMany(db.User);
db.User.belongsTo(db.Role);

db.User.hasOne(db.StudentProfile);
db.StudentProfile.belongsTo(db.User);

db.User.hasMany(db.Slot); // Mam creates slots
db.Slot.belongsTo(db.User);

db.User.hasMany(db.Appointment); // Student books appointments
db.Appointment.belongsTo(db.User);

db.Slot.hasMany(db.Appointment);
db.Appointment.belongsTo(db.Slot);

db.Appointment.hasOne(db.SessionNote);
db.SessionNote.belongsTo(db.Appointment);

module.exports = db;
