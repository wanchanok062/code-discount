import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../config';
const secretKey = JWT_SECRET_KEY ?? '';

export const generateToken = (
    id: string | number,
    email: string,
    role: string = 'customer',
): string => {
    const payload = { id, email, role };
    const token = jwt.sign(payload, secretKey, { expiresIn: '3h' });
    return token;
};
