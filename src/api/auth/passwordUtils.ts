import bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from '../../config';

const SALT_ROUNDS = parseInt(BCRYPT_SALT_ROUNDS ?? '10', 10);

export const hashPassword = async (password: string): Promise<string> => {
    try {
        return await bcrypt.hash(password, SALT_ROUNDS);
    } catch (error) {
        throw new Error('Error hashing the password');
    }
};

export const comparePasswords = async (
    plainPassword: string,
    hashedPassword: string,
): Promise<boolean> => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};
