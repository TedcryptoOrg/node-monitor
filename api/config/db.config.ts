import {Dialect} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

type DatabaseConfig = {
    HOST: string,
    USER: string,
    PASSWORD: string,
    DB: string,
    PORT: number,
    dialect: Dialect,
    pool: {
        max: number,
        min: number,
        acquire: number,
        idle: number
    }
}

const dbConfig: DatabaseConfig = {
    HOST: String(process.env.DB_HOST),
    USER: String(process.env.DB_USER),
    PASSWORD: String(process.env.DB_PASS),
    PORT: Number(process.env.DB_PORT),
    DB: String(process.env.DB_NAME),
    dialect: String(process.env.DB_DIALECT) as Dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

export default dbConfig;