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
exports.getEventDetails = exports.addEventDetails = void 0;
const aws_1 = __importDefault(require("../configs/aws"));
const uuid_1 = require("uuid");
const addEventDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventName, club_id, max_allowed } = req.body;
        if (eventName === undefined || eventName === null || eventName === "") {
            res.status(400).json({ message: "Event name is required" });
            return;
        }
        const id = (0, uuid_1.v4)().toString(); // generating unique id
        const created_at = new Date().toISOString(); // generating timestamp
        const updated_at = new Date().toISOString(); // generating timestamp
        const query = `INSERT INTO events(id, name, created_at, updated_at, club_id, max_allowed) VALUES($1, $2, $3, $4, $5, $6)`; // query to insert into the table
        try {
            yield aws_1.default.none(query, [
                `${id}`,
                `${eventName}`,
                `${created_at}`,
                `${updated_at}`,
                `${club_id}`,
                `${max_allowed}`,
            ]);
            res.status(201).json({ message: "Event record inserted successfully" }); // sending success response
        }
        catch (error) {
            if (error.code == '23503') {
                res.status(500).json({ error: "Selected Club does not exist", errorMessage: error }); //sending error response
                return;
            }
            res.status(500).json({ error: "Error inserting event record", errorMessage: error }); // sending error response
        }
    }
    catch (err) {
        res.status(500).json({ error: err }); // sending error response
    }
});
exports.addEventDetails = addEventDetails;
const getEventDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT * FROM events`;
        try {
            const data = yield aws_1.default.any(query);
            res.status(200).json({ message: "Record fetched successfully", data: data });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching record", errorMessage: error });
        }
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.getEventDetails = getEventDetails;
