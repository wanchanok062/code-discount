import request from 'supertest';
import app from '../server';

const token = process.env.TEST_TOKEN;

describe('GET /api/user', () => {
    it('should return a user object', async () => {
        const response = await request(app)
            .get('/api/user')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty('userName');
        expect(response.body.data).toHaveProperty('Fname');
        expect(response.body.data).toHaveProperty('Lname');
        expect(response.body.data).toHaveProperty('email');
    });
});
describe('GET /api/user', () => {
    it('should return a user object', async () => {
        const response = await request(app)
            .get('/api/user')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty('userName');
        expect(response.body.data).toHaveProperty('Fname');
        expect(response.body.data).toHaveProperty('Lname');
        expect(response.body.data).toHaveProperty('email');
    });
});
