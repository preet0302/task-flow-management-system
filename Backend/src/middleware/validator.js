const Joi = require("joi");
const AppError = require("../utils/AppError");

// 🔥 REGISTER VALIDATION
const registerValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  next();
};

// 🔥 LOGIN VALIDATION
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  next();
};

// 🔥 TASK VALIDATION
const taskValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().allow(""),
    status: Joi.string().valid("Pending", "In Progress", "Completed"),
    priority: Joi.string().valid("Low", "Medium", "High"),
    dueDate: Joi.date().optional(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  next();
};
const userUpdateValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2),
    email: Joi.string().email(),
    role: Joi.string().valid("user", "admin"),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  next();
};

module.exports = {
  registerValidation,
  loginValidation,
  taskValidation,
  userUpdateValidation,
};