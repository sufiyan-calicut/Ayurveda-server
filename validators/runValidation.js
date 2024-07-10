import {validationResult} from 'express-validator';

export const runValidation = async (req, res, next, rules) => {
  try {
    for (const rule of rules) {
      await rule.run(req);
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Internal Server Error: occurred while validating. ${error.message}`
    });
  }
};