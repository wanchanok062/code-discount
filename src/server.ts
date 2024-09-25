import express from 'express';
import { PORT, SESSION_SECRET } from './config';
import { initDatabase } from './config/database';
import morgan from 'morgan';
import { logShowServerDetial } from './utility/log-table-server-detial';
import cors from 'cors';
import helmet from 'helmet';
import routes from './api/router';
import 'reflect-metadata';
import { limiter } from './utility/rateLimit';
import session from 'express-session';
import passport from 'passport';
import './api/auth-google/utility/google-strategy';

const mode = process.env.NODE_ENV;
const app = express();

app.use(cors());
app.use(limiter);
app.use(
    morgan(
        ':remote-addr :method :url :status :res[content-length] - :response-time ms',
    ),
);
app.use(helmet());
app.use(express.json());
app.use(
    session({
        secret: SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
    }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

async function initialize() {
    try {
        await initDatabase(String(mode));
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
function next(err: any): void {
    throw new Error('Function not implemented.');
}
