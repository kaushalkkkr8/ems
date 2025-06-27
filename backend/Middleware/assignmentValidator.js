const Joi = require("joi");

const createAssignmentValidation = (req, res, next) => {
  const schema = Joi.object({
    engineerId: Joi.string().length(24).hex().required(),
    projectId: Joi.string().length(24).hex().required(),
    allocationPercentage: Joi.number().min(1).max(100).required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().greater(Joi.ref("startDate")).required(),
    role: Joi.string().max(100).optional()
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Invalid assignment data",
      errors: error.details.map((e) => e.message)
    });
  }

  next();
};

module.exports = createAssignmentValidation;