import { Sequelize } from 'sequelize-typescript';
import config from './config';
import { logShowDatabaseStatus } from '../utility/log-table-server-detial';
import path from 'path';

const isDevelopment = process.env.NODE_ENV === 'development';
export const sequelize = new Sequelize({
    ...config,
    models: [path.join(__dirname, '../models')],
    logging: isDevelopment ? console.log : false,
    timezone: '+07:00',
});

export async function initDatabase(mode: string): Promise<void> {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        logShowDatabaseStatus(mode);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
}
