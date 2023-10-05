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
exports.getUsersForEvent = exports.getEventDetails = exports.deleteEvent = exports.addEventDetails = exports.updateEvent = void 0;
const aws_1 = __importDefault(require("../configs/aws"));
const uuid_1 = require("uuid");
// Update an event
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, max_allowed } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Event ID is required" });
        }
        // Check if the event with the specified ID exists
        const existingEvent = yield aws_1.default.oneOrNone("SELECT * FROM public.events WHERE id = $1", [id]);
        if (!existingEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        // Update the event
        const updated_at = new Date().toISOString();
        yield aws_1.default.none("UPDATE public.events SET name = $1, max_allowed = $2, updated_at = $3 WHERE id = $4", [name, max_allowed, updated_at, id]);
        res.status(200).json({ message: "Event updated successfully" });
    }
    catch (error) {
        console.error("Error updating event:", error);
        res
            .status(500)
            .json({ error: "Error updating event", errorMessage: error });
    }
});
exports.updateEvent = updateEvent;
const addEventDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventName, max_allowed } = req.body;
        if (eventName === undefined || eventName === null || eventName === "") {
            res.status(400).json({ message: "Event name is required" });
            return;
        }
        const id = (0, uuid_1.v4)().toString(); // generating unique id
        const created_at = new Date().toISOString(); // generating timestamp
        const updated_at = new Date().toISOString(); // generating timestamp
        const query = `INSERT INTO events(id, name, created_at, updated_at, max_allowed) VALUES($1, $2, $3, $4, $5)`; // query to insert into the table
        try {
            yield aws_1.default.none(query, [
                `${id}`,
                `${eventName}`,
                `${created_at}`,
                `${updated_at}`,
                // `${club_id}`,
                `${max_allowed}`,
            ]);
            res.status(201).json({ message: "Event record inserted successfully" }); // sending success response
        }
        catch (error) {
            res
                .status(500)
                .json({ error: "Error inserting event record", errorMessage: error }); // sending error response
        }
    }
    catch (err) {
        res.status(500).json({ error: err }); // sending error response
    }
});
exports.addEventDetails = addEventDetails;
// Delete an event
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const query = "DELETE FROM public.events WHERE id = $1";
        yield aws_1.default.none(query, [id]);
        res.status(200).json({ message: "Event deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting event:", error);
        res
            .status(500)
            .json({ error: "Error deleting event", errorMessage: error });
    }
});
exports.deleteEvent = deleteEvent;
const getEventDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT * FROM events`;
        try {
            const data = yield aws_1.default.any(query);
            res
                .status(200)
                .json({ message: "Record fetched successfully", data: data });
        }
        catch (error) {
            res
                .status(500)
                .json({ error: "Error fetching record", errorMessage: error });
        }
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.getEventDetails = getEventDetails;
// Get users for a particular event
const getUsersForEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.id;
    try {
        const users = yield aws_1.default.any("SELECT u.* FROM public.registrations r INNER JOIN public.users u ON r.user_id = u.id WHERE r.user_event = $1", [eventId]);
        res.status(200).json({
            message: "Users for the event fetched successfully",
            data: users,
        });
    }
    catch (error) {
        console.error("Error fetching users for event:", error);
        res
            .status(500)
            .json({ error: "Error fetching users for event", errorMessage: error });
    }
});
exports.getUsersForEvent = getUsersForEvent;
