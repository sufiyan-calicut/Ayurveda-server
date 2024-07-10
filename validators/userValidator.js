import {
  nameValidation,
  emailValidation,
  mobileValidation,
  addressValidation,
  passwordValidation
} from './validationRules.js';

import {runValidation} from './runValidation.js'

export const validateUser = async (req, res, next) => {
    const rules = [
        nameValidation,
        emailValidation,
        mobileValidation,
        addressValidation,
        passwordValidation
    ]

    await runValidation(req, res, next, rules)
}