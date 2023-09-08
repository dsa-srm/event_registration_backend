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
exports.deleteEvent = exports.updateEvent = void 0;
const aws_1 = __importDefault(require("../configs/aws"));
// Update an event
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { event_id, name, club_id } = req.body;
        if (!event_id) {
            return res.status(400).json({ message: 'Event ID is required' });
        }
        // Check if the event with the specified ID exists
        const existingEvent = yield aws_1.default.oneOrNone('SELECT * FROM public.events WHERE id = $1', [event_id]);
        if (!existingEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        // Update the event
        const updated_at = new Date().toISOString();
        yield aws_1.default.none('UPDATE public.events SET name = $1, club_id = $2, updated_at = $3 WHERE id = $4', [
            name,
            club_id,
            updated_at,
            event_id,
        ]);
        res.status(200).json({ message: 'Event updated successfully' });
    }
    catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Error updating event', errorMessage: error });
    }
});
exports.updateEvent = updateEvent;
// Delete an event
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { event_id } = req.body;
        const query = 'DELETE FROM public.events WHERE id = $1';
        yield aws_1.default.none(query, [event_id]);
        res.status(200).json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Error deleting event', errorMessage: error });
    }
});
exports.deleteEvent = deleteEvent;
