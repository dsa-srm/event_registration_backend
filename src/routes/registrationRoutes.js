"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registration_1 = require("../middlewares/registration");
const registrationController_1 = require("../controllers/registrationController");
// const limiter = rateLimit({
// 	windowMs: 10 * 60 * 1000, // 10 minutes
// 	limit: 20, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
// 	message: "Too many requests from this device, please try again after 10 mins",
// });
const router = express_1.default.Router();
router.post("/registrations", 
// limiter,
registration_1.validateRequiredFields, registrationController_1.RegistrationController.registerUserForEvent);
// Get all registrations
router.get("/registrations", registrationController_1.RegistrationController.getAllRegistrations);
// // Get a particular registration by ID
// router.get('/registrations/:id', getRegistrationById);
// // Update a registration by ID
// router.patch('/registrations/:id', updateRegistration);
// Delete a registration by ID
router.delete("/registrations/:id", registrationController_1.RegistrationController.deleteRegistration);
exports.default = router;
