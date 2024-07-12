import jwt from 'jsonwebtoken';

export const generateToken = credential => {
  try {
    return jwt.sign(credential, process.env.JWT_SECRET, {expiresIn: '60d'});
  } catch (error) {
    console.error('error in jwt sign');
    throw new Error(error);
  }
};
