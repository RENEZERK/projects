import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.json({ success: false, message: 'missing token' });
    }

    const token = header.startsWith('Bearer ') ? header.slice(7) : header;
    if (!token) {
      return res.json({ success: false, message: 'missing token' });
    }

    jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    return res.json({ success: false, message: 'invalid token' });
  }
};

export default auth;

