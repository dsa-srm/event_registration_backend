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
exports.getUserEvents = exports.getUserDetails = exports.deleteUser = exports.updateUser = exports.createUser = exports.getAllUsers = void 0;
const aws_1 = __importDefault(require("../configs/aws")); // Assuming you have a database configuration set up
const uuid_1 = require("uuid");
// Get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield aws_1.default.any('SELECT * FROM public.users');
        res.status(200).json({ message: 'All users fetched successfully', data: users });
    }
    catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ error: 'Error fetching all users', errorMessage: error });
    }
});
exports.getAllUsers = getAllUsers;
// Create a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone, reg, email, department, year } = req.body;
        // Validate required fields
        if (!name || !phone || !reg || !email || !department || !year) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Generate timestamps
        const created_at = new Date().toISOString();
        const updated_at = new Date().toISOString();
        const id = (0, uuid_1.v4)().toString();
        // Insert user into the database
        yield aws_1.default.none('INSERT INTO public.users(id, name, phone, reg, email, department, year, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)', [id, name, phone, reg, email, department, year, created_at, updated_at]);
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user', errorMessage: error });
    }
});
exports.createUser = createUser;
// Update a user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, phone, reg, email, department, year } = req.body;
        // Check if the user with the specified ID exists
        const existingUser = yield aws_1.default.oneOrNone('SELECT * FROM public.users WHERE id = $1', [id]);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Update the user
        const updated_at = new Date().toISOString();
        yield aws_1.default.none('UPDATE public.users SET name = $1, phone = $2, reg = $3, email = $4, department = $5, year = $6, updated_at = $7 WHERE id = $8', [name, phone, reg, email, department, year, updated_at, id]);
        res.status(200).json({ message: 'User updated successfully' });
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error updating user', errorMessage: error });
    }
});
exports.updateUser = updateUser;
// Delete a user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // Delete the user with the specified ID
        yield aws_1.default.none('DELETE FROM public.users WHERE id = $1', [id]);
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Error deleting user', errorMessage: error });
    }
});
exports.deleteUser = deleteUser;
// const users = await db.any(
//   'SELECT u.* FROM public.registrations r INNER JOIN public.users u ON r.user_id = u.id WHERE r.user_event = $1',
//   [eventId]
// );
// Fetch user details
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // Retrieve user details based on the specified ID
        const user = yield aws_1.default.oneOrNone('SELECT * FROM public.users WHERE id = $1', [id]);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const events = yield aws_1.default.any('SELECT u.id , u.name  FROM public.registrations r INNER JOIN public.events u ON r.user_event = u.id WHERE r.user_id = $1', [id]);
        user.events = events;
        res.status(200).json({ message: 'User details fetched successfully', user });
    }
    catch (error) {
        console.error('Error fetching user details:', error);
        res
            .status(500)
            .json({ error: 'Error fetching user details', errorMessage: error });
    }
});
exports.getUserDetails = getUserDetails;
//Get all the events a user have registered for based on his registration number
// SELECT e.id, e.name
// FROM public.events e
// INNER JOIN public.registrations r ON e.id = r.user_event
// WHERE r.user_id = (SELECT id FROM public.users WHERE register_number = $1);
// Fetch user details
const getUserEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reg_no = req.params.reg_no;
        const events = yield aws_1.default.any('SELECT e.id, e.name FROM public.events e INNER JOIN public.registrations r ON e.id = r.user_event WHERE r.user_id = (SELECT id FROM public.users WHERE reg = $1);', [reg_no]);
        res.status(200).json({ message: 'User events fetched successfully', events: events });
    }
    catch (error) {
        console.error('Error fetching event details:', error);
        res
            .status(500)
            .json({ error: 'Error fetching event details', errorMessage: error });
    }
});
exports.getUserEvents = getUserEvents;
