import { validationResult } from 'express-validator';
const handleValidationErrors = (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error(`Error message : `, errors.array());
        return res.status(400).json({ validationErrors: errors.array() });
    }
    next();
};

export default handleValidationErrors;
