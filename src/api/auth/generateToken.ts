import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../config';
const secretKey = JWT_SECRET_KEY ?? '';

export const generateToken = (id: string | number, email: string): string => {
    const payload = { id, email };
    const token = jwt.sign(payload, secretKey, { expiresIn: '3h' });
    return token;
};
