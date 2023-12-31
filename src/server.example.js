"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_promise_1 = __importDefault(require("pg-promise"));
const app = (0, express_1.default)();
const fs = require('fs');
const cors = require('cors');
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use(cors());
const dbConfig = require('./configs/aws');
const pgp = (0, pg_promise_1.default)();
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
function createTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db.none(createTableQuery);
            console.log('Table created successfully');
        }
        catch (error) {
            console.error('Error creating table:', error);
        }
    });
}
function insertSampleRecord() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db.none('INSERT INTO sample_table(name, email) VALUES($1, $2)', ['bob Thebuilder', 'bob@srmist.com']);
            console.log('Record inserted successfully');
        }
        catch (error) {
            console.error('Error inserting record:', error);
        }
    });
}
// async function fetchSampleData() {
//   try {
//     const data = await db.any('SELECT * FROM sample_table');
//     console.log('Fetched Data:', data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }
function fetchSampleData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield db.any('SELECT * FROM sample_table');
            console.log('Fetched Data:', data);
            return data; //return
        }
        catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    });
}
// createTable();
// insertSampleRecord();
fetchSampleData();
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello, TypeScript Backend!');
// });
//insert endpoint
app.post('/insert-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        yield db.none('INSERT INTO sample_table(name, email) VALUES($1, $2)', [name, email]);
        console.log('Data inserted successfully:', { name, email });
        res.status(200).json({ message: 'Data inserted successfully' });
    }
    catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Failed to insert data' });
    }
}));
//fetch endpoint 
app.get('/fetch-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fetchSampleData();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching data.' });
    }
}));
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
