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
<<<<<<< HEAD
    // ca: fs.readFileSync(pemFile),
    rejectUnauthorized: true, // this was the problem
=======
    rejectUnauthorized: true, 
>>>>>>> a463ddcbe20a4b088266445b4b9696491876fc88
  },
};
const db = pgp(dbConfig);

export default db;