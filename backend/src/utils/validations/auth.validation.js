import Joi from 'joi';

const registerValidation = Joi.object({
    fullname: Joi.string()
        .min(3)
        .max(255)
        .required()
        .messages({
            'string.empty': 'Full name is required',
            'string.min': 'Full name must be at least 3 characters',
            'any.required': 'Full name is required',
        }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required',
        }),
    password: Joi.string()
        .min(8)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters',
            'any.required': 'Password is required',
        }),
});


const loginValidation = Joi.object({
    email: Joi.string().email(
        {
            minDomainSegments:2,tlds:{allow:['com','net']}
        }
    ).required().messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required',
        }),
    password:Joi.string().min(8).required().messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters',
            'any.required': 'Password is required',
        }),
})

export {registerValidation,loginValidation}