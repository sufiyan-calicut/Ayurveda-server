import {check, param} from 'express-validator';

// ..............................................................

export const mongoIdValidation = param('_id')
  .notEmpty()
  .withMessage('mongo ID is required')
  .isMongoId()
  .withMessage('Invalid mongo ID format')
  .trim();

export const imageUrlValidation = check('imageUrl')
  .notEmpty()
  .withMessage('Image URL is required')
  .isURL()
  .withMessage('Invalid URL format')
  .trim()
  .escape();

export const titleValidation = check('title')
  .notEmpty()
  .withMessage('Title is required')
  .isLength({min: 5})
  .withMessage('Title must be at least 5 characters long')
  .trim()
  .escape();

export const descriptionValidation = check('description')
  .notEmpty()
  .withMessage('Description is required')
  .isLength({min: 10})
  .withMessage('Description must be at least 10 characters long')
  .trim()
  .escape();

export const nameValidation = check('name')
  .notEmpty()
  .withMessage('Name is required')
  .matches(/^[A-Za-z\s]+$/)
  .withMessage('Name can only contain letters and spaces')
  .trim()
  .customSanitizer(value =>
    value.replace(/\b\w/g, match => match.toUpperCase())
  );

export const mobileValidation = check('mobile')
  .notEmpty()
  .withMessage('Mobile is required')
  .isMobilePhone()
  .withMessage('Invalid mobile phone format')
  .trim();

export const passwordValidation = check('password')
  .isLength({min: 4})
  .withMessage('Password Must Be at Least 8 Characters')
  .matches('[0-9]')
  .withMessage('Password Must Contain a Number')
  .matches('[A-Z]')
  .withMessage('Password Must Contain an Uppercase Letter')
  .trim()
  .escape();

export const addressValidation = check('address')
  .notEmpty()
  .withMessage('Address is required')
  .trim();

export const emailValidation = check('email')
  .notEmpty()
  .withMessage('Email is required')
  .isEmail()
  .withMessage('Please enter a valid email address')
  .trim()
  .normalizeEmail()
  .custom(value => {
    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(value)) {
      throw new Error('Please enter a valid email address');
    }
    return true;
  });

export const otpValidation = check('otp')
  .notEmpty()
  .withMessage('OTP is required')
  .isNumeric()
  .withMessage('OTP must be numeric')
  .isLength({min: 6, max: 6})
  .withMessage('OTP must be exactly 6 digits');
