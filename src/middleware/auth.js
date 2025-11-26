const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const TOKEN_EXPIRY = process.env.JWT_EXPIRE || '7d';

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'No authorization header provided' });
  }
  
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided in authorization header' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Insufficient permissions' });
    }
    
    next();
  };
};

module.exports = { authenticate, authorize };
