"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_promise_1 = __importDefault(require("pg-promise"));
const pgp = (0, pg_promise_1.default)();
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
const cors = require('cors');
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(cors());
//importing routes
const clubRoutes_1 = __importDefault(require("./routes/clubRoutes"));
app.use('/api/v1', clubRoutes_1.default);
app.get('/', (req, res) => {
    const date = new Date().toLocaleString();
    res.status(200).json({
        status: 200,
        message: 'Server Running Successfully',
        date: date
    });
<<<<<<< HEAD
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
            // console.log('Fetched Data:', data);
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
=======
});
>>>>>>> origin/ankit_clubApi
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
process.on('exit', () => {
    pgp.end();
});
