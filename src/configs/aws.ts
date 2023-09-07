import * as dotenv from "dotenv";

dotenv.config();
import pgPromise from "pg-promise";

const pgp = pgPromise();

const dbConfig = {
  host: process.env.DBHOST,
  port: 5432,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  ssl: {
    rejectUnauthorized: true, // this was the problem
  },
};
const db = pgp(dbConfig);

export default db;
