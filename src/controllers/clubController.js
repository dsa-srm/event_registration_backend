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
exports.getClubAndEventDetails = exports.deleteClubDetails = exports.getClubDetails = exports.addClubDetails = void 0;
const aws_1 = __importDefault(require("../configs/aws"));
const uuid_1 = require("uuid");
// import generateToken from "../utils/tokenGenerator";
//write your code here
// if you code exceeds the max length of 50 lines, then write your code in parts inside service and export them here.
const addClubDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clubName } = req.body;
        //checking if valid club name is provided
        if (clubName === undefined || clubName === null || clubName === "") {
            res.status(404).json({ message: "club name is required" });
            return;
        }
        const id = (0, uuid_1.v4)().toString(); //generating unique id
        // const token = generateToken();  //generating token
        const created_at = new Date().toISOString(); //generating timestamp
        const updated_at = new Date().toISOString(); //generating timestamp
        const query = `INSERT INTO clubs(id,name,created_at,updated_at) VALUES($1,$2,$3,$4)`; //query to insert data
        try {
            yield aws_1.default.none(query, [
                `${id}`,
                `${clubName}`,
                // `${token}`,
                `${created_at}`,
                `${updated_at}`,
            ]);
            res.status(201).json({ message: "Record inserted successfully", club_id: id }); //sending response
        }
        catch (error) {
            //checking if duplicate record is being inserted
            res
                .status(500)
                .json({ error: "Error inserting record.", errorMessage: error }); //sending error response
        }
    }
    catch (err) {
        res.status(500).json({ error: err }); //sending error response
    }
});
exports.addClubDetails = addClubDetails;
const getClubDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT * FROM clubs`; //query to fetch data
        try {
            const data = yield aws_1.default.any(query); //fetching data
            res
                .status(200)
                .json({ message: "Record fetched successfully", data: data }); //sending response
        }
        catch (error) {
            res
                .status(500)
                .json({ error: "Error fetching record.", errorMessage: error }); //sending error response
        }
    }
    catch (err) {
        res.status(500).json({ error: err }); //sending error response
    }
});
exports.getClubDetails = getClubDetails;
const deleteClubDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const club_id = req.params.id;
        const query = 'DELETE FROM clubs WHERE id = $1;'; //query to delete data
        try {
            yield aws_1.default.none(query, [club_id]); //deleting data
            res.status(200).json({ message: "Record deleted successfully" }); //sending response
        }
        catch (error) {
            res
                .status(500)
                .json({ error: "Error deleting record.", errorMessage: error }); //sending error response
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" }); //sending error response
    }
});
exports.deleteClubDetails = deleteClubDetails;
const getClubAndEventDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = ` SELECT  c.id, e.name FROM public.clubs c  INNER JOIN public.events e
  ON c.id = e.club_id`; //query to fetch data
        try {
            const result = yield aws_1.default.any(query); //fetching data
            res.status(200).json({ message: "Record fetched successfully", count: result.length, data: result }); //sending response
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching record.", errorMessage: error }); //sending error response
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" }); //sending error response
    }
});
exports.getClubAndEventDetails = getClubAndEventDetails;
