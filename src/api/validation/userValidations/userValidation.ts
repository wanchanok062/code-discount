import { body } from 'express-validator';

const createUserValidation = [
    body('Fname')
        .notEmpty()
        .isString()
        .withMessage('Fname must be a string and not empty'),
    body('Lname')
        .notEmpty()
        .isString()
        .withMessage('Lname must be a string and not empty'),
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

export const userValidation = {
    createUserValidation,
};
