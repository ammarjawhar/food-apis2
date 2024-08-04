import jwt from 'jsonwebtoken';

const AuthMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  try {
    const token_decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decoded.id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, message: 'ERROR' });
  }
};

export default AuthMiddleware;
