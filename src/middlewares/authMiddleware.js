const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');
const db = require('../models');
const User = db.User;
const Role = db.Role;

module.exports = async (req, res, next) => {
  try {
    let token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    const decoded = jwt.verify(token, jwtConfig.secret);
    const user = await User.findByPk(decoded.id, { include: Role });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.userId = user.id;
    req.userRole = user.Role.name;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
