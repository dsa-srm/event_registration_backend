import express from "express";
import { validateRequiredFields } from "../middlewares/registration";
import { RegistrationController } from "../controllers/registrationController";
import rateLimit from "express-rate-limit";

// const limiter = rateLimit({
// 	windowMs: 10 * 60 * 1000, // 10 minutes
// 	limit: 20, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
// 	message: "Too many requests from this device, please try again after 10 mins",
// });

const router = express.Router();

router.post(
	"/registrations",
	// limiter,
	validateRequiredFields,
	RegistrationController.registerUserForEvent
);

// Get all registrations
router.get("/registrations", RegistrationController.getAllRegistrations);

// // Get a particular registration by ID
// router.get('/registrations/:id', getRegistrationById);

// // Update a registration by ID
// router.patch('/registrations/:id', updateRegistration);

// Delete a registration by ID
router.delete("/registrations/:id", RegistrationController.deleteRegistration);

export default router;
