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
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
app.use('/api/v1', clubRoutes_1.default);
app.use('/api/v1', eventRoutes_1.default);
app.get('/', (req, res) => {
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
