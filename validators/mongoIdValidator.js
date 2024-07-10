import {runValidation} from './runValidation.js';
import {mongoIdValidation} from './validationRules.js';

export const mongoIdValidator = async (req, res, next) => {
  const rules = [mongoIdValidation];
  await runValidation(req, res, next, rules);
};
