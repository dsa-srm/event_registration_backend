import express from "express";
import { validateRequiredFields } from "../middlewares/registration";
import { RegistrationController } from "../controllers/registrationController";

const router = express.Router();

router.post(
	"/registrations",
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
