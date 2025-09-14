/**
 * Creates validation middleware for different parts of the request
 * @param {Object} schema - Joi schema to validate against
 * @param {string} property - Which part of req to validate ('body', 'query', 'params', 'headers')
 * @returns {Function} Express middleware function
 */

export const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const dataToValidate = req[property];

    console.log("Validating: ", dataToValidate);

    const { error, value } = schema.validate(dataToValidate, {
      allowUnknown: false,
      stripUnknown: true,
      convert: true,
    });

    if (error) {
      console.log("Validation error: ", error.details[0]);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        field: error.details[0].path.join("."),
        value: error.details[0].context?.value,
      });
    }

    req.validated = {};
    req.validated[property] = value;

    console.log(`Validated ${property}: `, value);

    next();
  };
};

export const validateQuery = (schema) => validate(schema, "query");
export const validateBody = (schema) => validate(schema, "body");
export const validateParams = (schema) => validate(schema, "params");
