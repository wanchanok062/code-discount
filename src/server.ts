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

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(routes);

async function initialize() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        logShowDatabaseStatus();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

initialize();

app.listen(PORT, () => {
    const mode = process.env.NODE_ENV;
    const port = PORT;
    logShowServerDetial(Number(port), String(mode));
});
