import express from 'express';
import { PORT } from './config';
import { sequelize } from './config/database';
import morgan from 'morgan';
import {
    logShowServerDetial,
    logShowDatabaseStatus,
} from './utility/log-table-server-detial';
import cors from 'cors';
import helmet from 'helmet';
import routes from './api/router';

const mode = process.env.NODE_ENV;
const app = express();

app.use(cors());
app.use(
    morgan(
        ':remote-addr :method :url :status :res[content-length] - :response-time ms',
    ),
);
app.use(helmet());
app.use(express.json());
app.use(routes);

async function initialize() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        logShowDatabaseStatus(String(mode));
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

if (process.env.NODE_ENV !== 'test') {
    initialize().then(() => {
        app.listen(PORT, () => {
            logShowServerDetial(Number(PORT), String(mode));
        });
    });
}

export default app;
