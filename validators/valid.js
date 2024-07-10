import { runValidation } from './runValidation.js';
import {
  nameValidation,
  mobileValidation,
  passwordValidation,
  addressValidation,
  driverIdValidation
} from './validationRules';

// Driver Registration
export const validateDriver = async (req, res, next) => {
  const rules = [
    nameValidation,
    mobileValidation,
    passwordValidation,

    addressValidation
  ];
  await runValidation(req, res, next, rules);
};

// Driver Login
export const validateDriverLogin = async (req, res, next) => {
  const rules = [mobileValidation, passwordValidation];
  await runValidation(req, res, next, rules);
};

// Validate Driver ID
export const validateDriverId = async (req, res, next) => {
  const rules = [driverIdValidation];
  await runValidation(req, res, next, rules);
};

// Update Driver
export const validateUpdateDriver = async (req, res, next) => {
  const rules = [
    nameValidation.optional(),
    mobileValidation.optional(),
    addressValidation,
    licenseValidation.optional()
  ];
  await runValidation(req, res, next, rules);
};
