"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
module.exports = {
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: "knex_migrations",
        extension: 'ts',
        directory: path_1.default.resolve(__dirname, 'src', 'data', 'migrations')
    },
    seeds: {
        directory: path_1.default.resolve(__dirname, 'src', 'data', 'seeds')
    }
};
//# sourceMappingURL=knexfile.js.map