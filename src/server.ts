import express, { Request, Response } from 'express';
import pgPromise from 'pg-promise';

import * as dotenv from "dotenv";
dotenv.config();
const app = express();
const cors = require('cors');
const port = process.env.PORT ;
app.use(express.json());
app.use(cors());


const pgp = pgPromise();


//importing routes

import clubRoutes from './routes/clubRoutes';

app.use('/api/v1',clubRoutes);

app.get('/', (req: Request, res: Response) => {
  
    const date = new Date().toLocaleString();
    res.status(200).json({
       status: 200,
       message: 'Server Running Successfully',
        date: date
    });

});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


process.on('exit', () => {
  pgp.end();
});
