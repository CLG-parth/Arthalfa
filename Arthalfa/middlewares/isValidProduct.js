import { body, validationResult } from 'express-validator';

export const validateProduct = (option) => {
    switch (option) {
        case 'create':
            return [
                body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
                body('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
                body('category').notEmpty().withMessage('Category is required').isString().withMessage('Category must be a string'),
                body('description').optional().isString().withMessage('Description must be a string'),
                validateRequest 
            ];
        case 'update':
            return [
                body('name').optional().isString().withMessage('Name must be a string'),
                body('price').optional().isNumeric().withMessage('Price must be a number'),
                body('category').optional().isString().withMessage('Category must be a string'),
                body('description').optional().isString().withMessage('Description must be a string'),
                validateRequest
            ];
        default:
            return (req, res) => res.status(500).json({ message: 'Internal Server Error' });
    }
};

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map((error)=>error.msg) });
    }
    next();
};