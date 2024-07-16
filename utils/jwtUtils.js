import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = credential => {
  try {
    console.log(credential,'sedc')
    return jwt.sign(credential, process.env.JWT_SECRET , {expiresIn: '60d'});
  } catch (error) {
    console.error('error in jwt sign');
    throw new Error(error);
  }
};
