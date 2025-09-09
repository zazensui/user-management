import Joi from "joi";

export const listUsersSchema = Joi.object({
  page: Joi.number().integer().min(1).max(500).default(1).messages({
    "number.base": "Page must be a number",
    "number.integer": "Page must be an integer",
    "number.min": "Page must be at least 1",
    "number.max": "Page cannot exceed 500",
  }),
  page_size: Joi.number().integer().min(1).max(100).default(10).messages({
    "number.base": "Page size must be a number",
    "number.integer": "Page size must be an integer",
    "number.min": "Page size must be at least 1",
    "number.max": "Page cannot exceed 100",
  }),
});

export const authHeaderSchema = Joi.object({
  authorization: Joi.string()
    .pattern(/^Bearer\s+.+/)
    .required()
    .messages({
      "string.pattern.base":
        "Authorization header must be in format: Bearer {access_token}",
      "any.required": "Authorization header is required",
    }),
});
