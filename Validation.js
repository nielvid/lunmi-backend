const Joi = require("joi"); // using @hapi/joi to validate user input

// validate users info
const registerValidation = (data) => {
  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required().email().trim(),
    telephone: Joi.string().min(11).max(14).required()
  });
  return schema.validate(data);
};


const SpeakerValidation = (data) => {
  const schema = Joi.object({
    fullname: Joi.string().required(),
    profile: Joi.string().required(),
    image: Joi.string().required().required(),
    slug: Joi.string().min(11).max(11)
  });
  return schema.validate(data);
};

const EmailValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
  });
  return schema.validate(data);
};
module.exports = {
  registerValidation, SpeakerValidation, EmailValidation
};
