import * as joi from "joi";

const createUserSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string()
    .pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/))
    .required()
    .messages({
      "object.regex": "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
      "string.pattern.base": "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    }),
});

const userLoginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string()
});

export { createUserSchema, userLoginSchema };