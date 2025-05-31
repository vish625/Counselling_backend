const express = require('express');
const cors = require('cors');
const db = require('./models');
const errorHandler = require('./middlewares/errorHandler');
const responseFormatter = require('./middlewares/responseFormatter');

const app = express();

app.use(cors());
app.use(express.json());
app.use(responseFormatter);

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/students', require('./routes/student.routes'));
app.use('/api/slots', require('./routes/slot.routes'));
app.use('/api/appointments', require('./routes/appointment.routes'));
app.use('/api/sessions', require('./routes/session.routes'));
app.use('/api/reports', require('./routes/report.routes'));

// Error handling middleware
app.use(errorHandler);

// DB sync and server start
const PORT = process.env.PORT || 5000;

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
