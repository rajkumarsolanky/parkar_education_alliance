const jwt = require('jsonwebtoken');

function adminAuthMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Admin token nahi mila' });
  }
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    req.adminId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token invalid ya expire ho gaya' });
  }
}

module.exports = adminAuthMiddleware;
