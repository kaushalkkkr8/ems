const joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    name: joi.string().min(3).required(),
    password: joi.string().min(6).max(20).required(),
    role: joi.string().valid("engineer", "manager").required(),
    skills: joi.array().items(joi.string()),
    seniority: joi.string().valid("junior", "mid", "senior"),
    maxCapacity: joi.number().valid(50, 100),
    department: joi.string(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(20).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};
module.exports = { signupValidation, loginValidation };
