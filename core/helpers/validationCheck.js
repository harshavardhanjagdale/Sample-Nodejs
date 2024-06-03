const { body ,param} = require('express-validator');

exports.loginValidation=function(){
    return [
        body('email').notEmpty().withMessage("email is required").isEmail().withMessage('Invalid Email'),
        body('password').notEmpty().withMessage("password is required")
    ]
}  

exports.createUserValidate=()=>{
    return [
        body('first_name').notEmpty().withMessage('First Name is required').trim().isLength({ max: 15 }).withMessage('First name should not exceed 15 characters'),
        body('last_name').optional().isString().withMessage('Last Name should be string').trim(),
        body('email').notEmpty().withMessage('Email is required').trim().isEmail().withMessage('Invalid email address'),
        body('password').notEmpty().withMessage("password is required").trim()
    ]
}

exports.updateUserValidate=()=>{
    return[
        param('id').exists().withMessage("id is required"),
        body('first_name').notEmpty().withMessage('First Name is required'),
        body('last_name').optional().isString().withMessage('Last Name should be valid string'),
        body('email').notEmpty().withMessage("email id is reuired").trim().isEmail().withMessage("please enter valid email")
    ]
}