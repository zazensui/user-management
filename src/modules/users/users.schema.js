import Joi from "joi";

export const registerUserSchema = Joi.object({
  username: Joi.string().alphanum().min(4).max(30).lowercase().required().messages({
    "string.base": "Username must only contain alphanumeric characters",
    "string.min": "Username must contain at least 4 characters",
    "string.max": "Username must not contain more than 30 characters",
    "string.required": "Username is required",
  }),
  email: Joi.string().email().required().lowercase().trim().messages({
    "string.base": "Email address must represent a valid email address",
    "string.required": "Email address is required",
  }),
  password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])')).min(8).max(128).required().messages({
    "string.pattern.base": "Password must contain uppercase, lowercase, number, and special character",
    "string.min": "Password must contain at least 4 characters",
    "string.max": "Password must not contain more than 30 characters",
    "string.required": "Password is required",
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    "any.only": "Password must match"
  })
});

export const listUsersSchema = Joi.object({
  page: Joi.number().integer().min(1).max(2147483647).default(1).messages({
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
