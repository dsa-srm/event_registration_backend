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
exports.deleteRegistration = exports.updateRegistration = exports.getRegistrationById = exports.getAllRegistrations = exports.registerUserForEvent = void 0;
const aws_1 = __importDefault(require("../configs/aws"));
const uuid_1 = require("uuid");
const registerUserForEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, user_club, user_event } = req.body;
        // Start a PostgreSQL transaction with Serializable isolation level
        yield aws_1.default.tx('serializable', (t) => __awaiter(void 0, void 0, void 0, function* () {
            // Check if the user is already registered for the same event
            const existingRegistration = yield t.oneOrNone('SELECT * FROM public.registrations WHERE user_id = $1 AND user_event = $2', [user_id, user_event]);
            if (existingRegistration) {
                return res.status(400).json({ message: 'User is already registered for this event' });
            }
            // Fetch the max_allowed value for the event and check if the event exists
            const eventInfo = yield t.oneOrNone('SELECT max_allowed FROM public.events WHERE id = $1 FOR UPDATE', [user_event]);
            if (!eventInfo) {
                // Event not found, return an error
                return res.status(404).json({ message: 'Event not found Or Someone else is Booking, Please try again' });
            }
            const maxAllowed = eventInfo.max_allowed;
            // Count the number of registrations for the event
            const registrationCountResult = yield t.one('SELECT COUNT(*) FROM public.registrations WHERE user_event = $1', [user_event]);
            const registrationCount = parseInt(registrationCountResult.count, 10);
            // Check if booking is possible
            if (registrationCount >= maxAllowed) {
                return res.status(400).json({ message: 'Event is fully booked' });
            }
            // Generate a unique registration ID
            const registrationId = (0, uuid_1.v4)().toString();
            const created_at = new Date().toISOString();
            const updated_at = new Date().toISOString();
            // Insert the registration into the registrations table
            yield t.none('INSERT INTO public.registrations(id, user_id, user_club, user_event, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6)', [registrationId, user_id, user_club, user_event, created_at, updated_at]);
            res.status(201).json({ message: 'User registered for the event' });
        }));
    }
    catch (error) {
        console.error('Error registering user for event:', error);
        res.status(500).json({
            error: 'Error registering user for event',
            errorMessage: error,
        });
    }
});
exports.registerUserForEvent = registerUserForEvent;
// Get all registrations
const getAllRegistrations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registrations = yield aws_1.default.any('SELECT * FROM public.registrations');
        res.status(200).json({ message: 'Registrations fetched successfully', data: registrations });
    }
    catch (error) {
        console.error('Error fetching registrations:', error);
        res.status(500).json({ error: 'Error fetching registrations', errorMessage: error });
    }
});
exports.getAllRegistrations = getAllRegistrations;
// Get a particular registration by ID
const getRegistrationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const registrationId = req.params.id;
    try {
        const registration = yield aws_1.default.oneOrNone('SELECT * FROM public.registrations WHERE id = $1', [registrationId]);
        if (registration) {
            res.status(200).json({ message: 'Registration fetched successfully', data: registration });
        }
        else {
            res.status(404).json({ message: 'Registration not found' });
        }
    }
    catch (error) {
        console.error('Error fetching registration by ID:', error);
        res.status(500).json({ error: 'Error fetching registration', errorMessage: error });
    }
});
exports.getRegistrationById = getRegistrationById;
// Update a registration by ID
const updateRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const registrationId = req.params.id;
    const { user_id, user_club, user_event } = req.body;
    try {
        // Implement the code for updating a registration by ID here
        // This controller is responsible for updating an existing registration
    }
    catch (error) {
        console.error('Error updating registration:', error);
        res.status(500).json({ error: 'Error updating registration', errorMessage: error });
    }
});
exports.updateRegistration = updateRegistration;
// Delete a registration by ID
const deleteRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const registrationId = req.params.id;
    try {
        // Implement the code for deleting a registration by ID here
        // This controller is responsible for deleting an existing registration
        yield aws_1.default.none('DELETE FROM public.registrations WHERE id = $1', [registrationId]);
        res.status(200).json({ message: 'User unregistered successfully' });
    }
    catch (error) {
        console.error('Error deleting registration:', error);
        res.status(500).json({ error: 'Error deleting registration', errorMessage: error });
    }
});
exports.deleteRegistration = deleteRegistration;
