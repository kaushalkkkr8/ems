const Joi = require("joi");

const createProjectValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).allow(""),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().greater(Joi.ref("startDate")).required(),
    requiredSkills: Joi.array().items(Joi.string()).default([]),
    teamSize: Joi.number().integer().min(1).required(),
    status: Joi.string().valid("planning", "active", "completed").default("planning"),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Invalid project data",
      errors: error.details.map((e) => e.message),
    });
  }

  next();
};

module.exports = createProjectValidation;