import {
  addressValidation,
  descriptionValidation,
  emailValidation,
  imageUrlValidation,
  mobileValidation,
  mongoIdValidation,
  nameValidation,
  otpValidation,
  passwordValidation,
  priceValidation,
  productNameValidation,
  quantityValidation,
  ratingValidation,
  reviewValidation,
  titleValidation
} from './validationRules.js';
import {runValidation} from './runValidation.js';

// .......................................OTP-VALIDATOR...............................................
export const validateOtp = async (req, res, next) => {
  const rules = [mongoIdValidation, otpValidation];
  await runValidation(req, res, next, rules);
};
// .......................................PASSWORD-VALIDATOR...............................................
export const validatePassword = async (req, res, next) => {
  const rules = [mongoIdValidation, passwordValidation];
  await runValidation(req, res, next, rules);
};
// .......................................SignIn-VALIDATOR...............................................
export const validateSignIn = async (req, res, next) => {
  const rules = [emailValidation, passwordValidation];
  await runValidation(req, res, next, rules);
};
// .......................................OTP-VALIDATOR...............................................

export const validateUser = async (req, res, next) => {
  const rules = [
    nameValidation,
    emailValidation,
    mobileValidation,
    addressValidation,
    passwordValidation
  ];

  await runValidation(req, res, next, rules);
};

// .......................................OTP-VALIDATOR...............................................

export const validateMongoId = async (req, res, next) => {
  const rules = [mongoIdValidation];
  await runValidation(req, res, next, rules);
};

export const validateTopBar = async (req, res, next) => {
  const rules = [titleValidation, descriptionValidation];
  await runValidation(req, res, next, rules);
};

export const validateEmail = async (req, res, next) => {
  const rules = [emailValidation];
  await runValidation(req, res, next, rules);
};
export const validateBanner = async (req, res, next) => {
  const rules = [imageUrlValidation, titleValidation, descriptionValidation];
  await runValidation(req, res, next, rules);
};

export const validateProduct = async (req, res, next) => {
  const rules = [
    productNameValidation,
    imageUrlValidation,
    descriptionValidation,
    priceValidation,
    quantityValidation
  ];
  await runValidation(req, res, next, rules);
};


export const validateRating = async (req, res, next) => {
  const rules = [
    ratingValidation,
    reviewValidation
  ]

  await runValidation(req, res, next, rules);
}