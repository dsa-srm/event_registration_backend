"use strict";
// services/RegistrationService.ts
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
exports.RegistrationService = void 0;
const uuid_1 = require("uuid");
const registration_1 = require("../queries/registration");
const users_1 = require("../queries/users");
const events_1 = require("../queries/events");
const aws_1 = __importDefault(require("../configs/aws"));
class RegistrationService {
    static registerUserForEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, phone, reg, email, department, year, 
                // user_club,
                user_event, } = req.body;
                yield aws_1.default.tx((t) => __awaiter(this, void 0, void 0, function* () {
                    // Fetch the max_allowed value for the event and check if the event exists
                    const eventInfo = yield events_1.EventQueries.fetchMaxAllowed(t, user_event);
                    if (!eventInfo) {
                        // Event not found, return an error
                        return res.status(404).json({
                            message: "Event not found or someone else is booking. Please try again",
                        });
                    }
                    const maxAllowed = eventInfo.max_allowed;
                    // Check if booking is possible
                    if (maxAllowed <= 0) {
                        return res.status(400).json({ message: "Event is fully booked" });
                    }
                    else {
                        // You can update the max_allowed value here based on your business logic
                        // For example, decrement it by 1 to simulate a booking
                        const updatedMaxAllowed = maxAllowed - 1;
                        // Update the max_allowed value in the events table
                        yield events_1.EventQueries.updateMaxAllowed(t, updatedMaxAllowed, user_event);
                        // Check if user with the same registration number already exists
                        const existingUser = yield users_1.UserQueries.fetchUserByRegAndMail(t, reg, email);
                        let id;
                        if (existingUser) {
                            id = existingUser.id;
                            // Check if the user with the same registration number is already registered for the event
                            const existingRegistration = yield registration_1.RegistrationQueries.checkUserAlreadyRegistered(t, id, user_event);
                            if (existingRegistration) {
                                return res
                                    .status(400)
                                    .json({ message: "User is already registered for the event" });
                            }
                        }
                        else {
                            // Generate timestamps
                            const created_at = new Date().toISOString();
                            const updated_at = new Date().toISOString();
                            id = (0, uuid_1.v4)().toString();
                            // Insert user into the database
                            yield users_1.UserQueries.addUser(t, id, name, phone, reg, email, department, year, created_at, updated_at);
                        }
                        // Generate a unique registration ID
                        const registrationId = (0, uuid_1.v4)().toString();
                        const registration_created_at = new Date().toISOString();
                        const registration_updated_at = new Date().toISOString();
                        // Insert the registration into the registrations table
                        yield registration_1.RegistrationQueries.registerUser(t, registrationId, id, 
                        // user_club,
                        user_event, registration_created_at, registration_updated_at);
                        res.status(201).json({ message: "User registered for the event" });
                    }
                }));
            }
            catch (error) {
                console.error("Error registering user for event:", error);
                res.status(500).json({
                    error: "Error registering user for event",
                    errorMessage: error,
                });
            }
        });
    }
    static getAllRegistrations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const registrations = yield registration_1.RegistrationQueries.fetchAllRegistrations();
                res.status(200).json({
                    message: "Registrations fetched successfully",
                    data: registrations,
                });
            }
            catch (error) {
                console.error("Error fetching registrations:", error);
                res
                    .status(500)
                    .json({ error: "Error fetching registrations", errorMessage: error });
            }
        });
    }
    static deleteRegistration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const registrationId = req.params.id;
            try {
                yield registration_1.RegistrationQueries.deleteRegistration(registrationId);
                res.status(200).json({ message: "User unregistered successfully" });
            }
            catch (error) {
                console.error("Error deleting registration:", error);
                res
                    .status(500)
                    .json({ error: "Error deleting registration", errorMessage: error });
            }
        });
    }
}
exports.RegistrationService = RegistrationService;
