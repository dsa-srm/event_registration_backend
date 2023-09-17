"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.get('/users', userController_1.getAllUsers);
// Create a new user
router.post('/users', userController_1.createUser);
// // Update a user
// router.patch('/users/:id', updateUser);
// // Delete a user
// router.delete('/users/:id', deleteUser);
// Fetch user details
router.get('/users/:id', userController_1.getUserDetails);
//Get all the user events by the register_number
router.get('/users/getAllEvents/:reg_no', userController_1.getUserEvents);
exports.default = router;
