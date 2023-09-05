import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

import pgPromise from 'pg-promise';
const dbConfig = {
    host: 'eventregtest.cxr56pugwihj.ap-south-2.rds.amazonaws.com',
    port: 5432, 
    database: 'eventregtest',
    user: 'techdsa',
    password: 'techDSA2023$',
  };
  const pgp = pgPromise();
  const db = pgp(dbConfig);
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS sample_table (
      id serial PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255)
    )
  `;
  async function createTable() {
    try {
      // Execute the SQL query to create the table
      await db.none(createTableQuery);
      console.log('Table created successfully');
    } catch (error) {
      console.error('Error creating table:', error);
    } finally {
      // Close the database connection
      pgp.end();
    }
  }
  async function testTable() {
    try {
      // Insert a sample record into the table
      await db.none('INSERT INTO sample_table(name, email) VALUES($1, $2)', ['bob Thebuilder', 'bob@srmist.com']);
      console.log('Record inserted successfully');
    } catch (error) {
      console.error('Error inserting record:', error);
    } finally {
      // Close the database connection
      pgp.end();
    }
  }

createTable();
testTable();


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
