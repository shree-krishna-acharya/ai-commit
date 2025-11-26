const rateLimit = new Map();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100;

const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, startTime: now });
    return next();
  }
  
  const data = rateLimit.get(ip);
  
  if (now - data.startTime > WINDOW_MS) {
    // Reset the window
    rateLimit.set(ip, { count: 1, startTime: now });
    return next();
  }
  
  if (data.count >= MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests, please try again later',
      retryAfter: Math.ceil((WINDOW_MS - (now - data.startTime)) / 1000)
    });
  }
  
  data.count++;
  next();
};

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimit.entries()) {
    if (now - data.startTime > WINDOW_MS) {
      rateLimit.delete(ip);
    }
  }
}, 60 * 60 * 1000);

module.exports = rateLimiter;
