import UserDB from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ............................................SIGNUP / REGISTRATION.....................................

export const userSignup = async (req, res) => {
  try {
    const {name, email, mobile, password, address} = req.body;

    let user = await UserDB.findOne({email});

    if (user) {
      return res
        .status(400)
        .json({message: `User already exists with this email`});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new UserDB({
      name,
      email,
      mobile,
      password: hashedPassword,
      address
    });

    await user.save();

    res.status(200).json({message: `User Registered Successfully`, user});
  } catch (error) {
    console.error(`Error In User Signup : ${error.message}`);
    res
      .status(500)
      .json({message: `Internal Server Error:`, error: error.message});
  }
};


