
import  dotenv from 'dotenv';

dotenv.config();
const dbConfig = {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    ssl: {
      rejectUnauthorized: true, // this was the problem
        },
  };


  export default dbConfig;