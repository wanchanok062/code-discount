import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../../../config';
const secretKey = JWT_SECRET_KEY ?? '';

export const generateToken = (userName: number, email: string): string => {
    const payload = { userName, email };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1m' });
    return token;
};
