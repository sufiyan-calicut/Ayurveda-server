import {UserDB} from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {generateToken} from '../utils/jwtUtils.js';
import {sendEmail} from '../utils/nodeMailerUtils.js';
import {getTempStoredData, storeTempData} from '../utils/tempStoreUtils.js';
import {TempStorageDB} from '../models/TempStorageModel.js';

// ............................................SIGNUP / REGISTRATION.....................................

export const userSignup = async (req, res) => {
  try {
    const {email, mobile} = req.body;

    let user = await UserDB.findOne({email});
    if (user) {
      return res
        .status(400)
        .json({message: 'User already exists with this email'});
    }

    let otp = await sendEmail(email);
    req.body.otp = otp;

    let tempUserId = await storeTempData(req.body);

    res
      .status(200)
      .json({message: 'OTP sent to email. Please verify.', tempUserId});
  } catch (error) {
    console.error(`Error In User Signup: ${error.message}`);
    res
      .status(500)
      .json({message: 'Internal Server Error', error: error.message});
  }
};

// ....................................................VERIFY-OTP..........................................

export const verifyOtp = async (req, res) => {
  const {otp} = req.body;
  const {_id: tempUserId} = req.params;

  try {
    const temp = await getTempStoredData(tempUserId);
    if (!temp) {
      return res.status(400).json({
        message:
          'Temporary user data has expired or been removed. Please sign up again.'
      });
    }

    const tempUser = temp.tempData;
    if (tempUser.otp !== otp) {
      return res.status(400).json({message: 'Invalid OTP. Please try again.'});
    }

    // ..........handling the otp verification of forgot password
    const existUser = await UserDB.findOne({email: tempUser.email});
    if (existUser) {
      await TempStorageDB.findByIdAndDelete(tempUserId);

      return res.status(200).json({
        message: 'otp verified!. Set up new password',
        _id: existUser._id
      });
    }
    const {name, email, mobile, password, address} = tempUser;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserDB({
      name,
      email,
      mobile,
      password: hashedPassword,
      address
    });
    await newUser.save();

    await TempStorageDB.findByIdAndDelete(tempUserId);

    const token = generateToken({id: newUser._id});

    res
      .status(200)
      .json({message: 'OTP verified successfully. User registered.', token});
  } catch (error) {
    console.error(`Error in OTP verification: ${error.message}`);
    res
      .status(500)
      .json({message: 'Internal Server Error', error: error.message});
  }
};

// ..................................................RESEND-OTP...........................................

export const resendOtp = async (req, res) => {
  try {
    const {_id: tempUserId} = req.params;
    const temp = await getTempStoredData(tempUserId);

    if (!temp) {
      return res
        .status(404)
        .json({message: `Time expired, please signup again`});
    }

    const otp = await sendEmail(temp.tempData.email);
    await TempStorageDB.findByIdAndUpdate(
      {_id: tempUserId},
      {$set: {'tempData.otp': otp}}
    );

    res
      .status(200)
      .json({message: 'OTP resent successfully. Please check your Email!'});
  } catch (error) {
    console.error(`Error in resend otp: ${error.message}`);
    res
      .status(500)
      .json({message: `Internal Server Error: `, error: error.message});
  }
};

// ....................................................SIGN IN..........................................

export const signIn = async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await UserDB.findOne({email});
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({message: 'Incorrect Password'});
    }

    let userCredential = {_id: user._id, name: user.name, email: user.email};

    if (user.isAdmin) {
      userCredential.isAdmin = true;
    }

    const token = generateToken(userCredential);
    let greeting = user.isAdmin
      ? 'login Successful!. Welcome to Admin Panel!'
      : 'login Successful!';
    res.status(200).json({message: greeting, token});
  } catch (error) {
    console.error('Error signing in user', error.message);
    res.status(500).json({message: 'Server error', error: error.message});
  }
};

// ....................................................FORGET-PASSWORD..........................................

export const forgotPassword = async (req, res) => {
  try {
    const {email} = req.body;
    const user = await UserDB.findOne({email});

    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    const otp = await sendEmail(email);

    const tempData = {email, otp, createdAt: Date.now()};
    const tempUserId = await storeTempData(tempData);

    res
      .status(200)
      .json({message: 'OTP sent to email. Please verify.', tempUserId});
  } catch (error) {
    console.error('Error in forgot password', error.message);
    res
      .status(500)
      .json({message: 'Internal Server Error', error: error.message});
  }
};

//.....................................................RESET-PASSWORD.................................................

export const resetPassword = async (req, res) => {
  try {
    const {_id} = req.params;
    const {password} = req.body;

    const user = await UserDB.findById({_id});
    if (!user) {
      return res.status(404).json({message: `User not found`});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({message: `Password reset completed!. Please Login!`});
  } catch (error) {
    console.error(`Error in resetPassword: ${error.message}`);
    res
      .status(500)
      .json({message: `Internal Server Error:`, error: error.message});
  }
};
