import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
   
  console.log(authHeader,'auth header')

  if (!authHeader) {
    return res.status(403).send('A token is required for authentication');
  }

  console.log(authHeader.split(' '))

  const token = authHeader.split(' ')[1]; // Extract the token part after 'Bearer'
  console.log(token, 'token');

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded, 'decoded');
    req.user = decoded;
    console.log(req.user, 'decoded user');
  } catch (err) {
    console.error(err);
    return res.status(401).json({message: 'Invalid token', error: err});
  }

  return next();
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    return res.status(403).send('Access denied. Admins only.');
  }
};

export const adminTokenVerify = (req, res, next) => {
  verifyToken(req, res, err => {
    if (err) return next(err);
    isAdmin(req, res, next);
  });
};
