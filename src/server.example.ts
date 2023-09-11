import express, { Request, Response } from 'express';
import pgPromise from 'pg-promise';


const app = express();
const fs = require('fs');
const cors = require('cors');
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());

const dbConfig = require('./configs/aws');

const pgp = pgPromise();
const db = pgp(dbConfig);

// async function testConnection() {
//   const c = await db.connect(); // try to connect
//   c.done(); // success, release connection
//   return c.client.serverVersion; // return server version
// }

// testConnection();



const createTableQuery = `
  CREATE TABLE IF NOT EXISTS sample_table (
    id serial PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
  )
`;

async function createTable() {
  try {
    
    await db.none(createTableQuery);
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

async function insertSampleRecord() {
  try {
   
    await db.none('INSERT INTO sample_table(name, email) VALUES($1, $2)', ['bob Thebuilder', 'bob@srmist.com']);
    console.log('Record inserted successfully');
  } catch (error) {
    console.error('Error inserting record:', error);
  }
}

// async function fetchSampleData() {
//   try {
//     const data = await db.any('SELECT * FROM sample_table');
//     console.log('Fetched Data:', data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }
async function fetchSampleData() {
  try {
    const data = await db.any('SELECT * FROM sample_table');
    console.log('Fetched Data:', data);
    return data; //return
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
}

// createTable();
// insertSampleRecord();
fetchSampleData();


// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello, TypeScript Backend!');
// });

//insert endpoint

app.post('/insert-data', async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    await db.none('INSERT INTO sample_table(name, email) VALUES($1, $2)', [name, email]);
    console.log('Data inserted successfully:', { name, email });
    res.status(200).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Failed to insert data' });
  }
});

//fetch endpoint 
app.get('/fetch-data', async (req: Request, res: Response) => {
  try {
    const data = await fetchSampleData();
    res.json(data); 
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data.' }); 
  }
});
// app.get('/fetch-data', async (req: Request, res: Response) => {
//   try {
//     await fetchSampleData();
//     res.send('Data fetched successfully!');
//   } catch (error) {
//     res.status(500).send('Error fetching data.');
//   }
// });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


process.on('exit', () => {
  pgp.end();
});
