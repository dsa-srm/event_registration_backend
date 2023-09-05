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
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const pg_promise_1 = __importDefault(require("pg-promise"));
const dbConfig = {
    host: 'eventregtest.cxr56pugwihj.ap-south-2.rds.amazonaws.com',
    port: 5432,
    database: 'eventregtest',
    user: 'techdsa',
    password: 'techDSA2023$',
};
const pgp = (0, pg_promise_1.default)();
const db = pgp(dbConfig);
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
            // Execute the SQL query to create the table
            yield db.none(createTableQuery);
            console.log('Table created successfully');
        }
        catch (error) {
            console.error('Error creating table:', error);
        }
        finally {
            // Close the database connection
            pgp.end();
        }
    });
}
function testTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Insert a sample record into the table
            yield db.none('INSERT INTO sample_table(name, email) VALUES($1, $2)', ['bob Thebuilder', 'bob@srmist.com']);
            console.log('Record inserted successfully');
        }
        catch (error) {
            console.error('Error inserting record:', error);
        }
        finally {
            // Close the database connection
            pgp.end();
        }
    });
}
createTable();
testTable();
app.get('/', (req, res) => {
    res.send('Hello, TypeScript Backend!');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
