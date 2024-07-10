
import {
  imageUrlValidation,
  titleValidation,
  descriptionValidation
} from './validationRules.js';
import { runValidation } from './runValidation.js';


export const validateBanner = async (req, res, next) => {
    const rules = [
        imageUrlValidation,
        titleValidation,
        descriptionValidation
    ]
    await runValidation(req, res, next, rules);
}

