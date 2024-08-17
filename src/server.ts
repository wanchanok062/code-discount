import express, { Request, Response } from 'express';
import { PORT } from './config';
import { sequelize } from './config/database';
const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

async function initialize() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
        console.log('Database synced');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

initialize();

app.listen(PORT, () => {
    console.log(
        `Server is running on http://localhost:${PORT} Mode ${process.env.NODE_ENV}`,
    );
});
