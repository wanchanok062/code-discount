import { Dialect, Options } from 'sequelize';
import {
    DatabaseHost,
    DatabaseName,
    DatabaseUser,
    DatabasePassword,
    DB_DIALECT,
} from '../config';
const dialect = DB_DIALECT as Dialect;
const config: Options = {
    database: DatabaseName,
    dialect: dialect,
    username: DatabaseUser,
    password: DatabasePassword,
    host: DatabaseHost,
    port: parseInt(process.env.DB_PORT as string),
};

export default config;
