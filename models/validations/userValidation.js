const Joi = require('joi')


const validateUser = async (user) => {
  const schema = Joi.object({
    fname: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(255).required('firstName is required'),
    lname: Joi.string().regex(/^[a-zA-Z]+$/).min(3).max(255).required('lastName is required'),
    email: Joi.string().email().required('email is required'),
    password: Joi.string().min(8).max(255).required('password is required'),
    
  })
  return schema.validate(user)
}



module.exports = validateUser