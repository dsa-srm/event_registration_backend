import * as dotenv from "dotenv";

dotenv.config();
import pgPromise from "pg-promise";
const fs = require('fs');
const pgp = pgPromise();
const dbConfig = {
  host: process.env.DBHOST,
  port: 5432,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  ssl: {
    rejectUnauthorized: true, 
  },
};
const db = pgp(dbConfig);

export default db;