import express from "express";
import {
	registerUserForEvent,
	getAllRegistrations,
	deleteRegistration,
} from "../controllers/registrationController";

const router = express.Router();

router.post("/registrations", registerUserForEvent);

// Get all registrations
router.get("/registrations", getAllRegistrations);

// // Get a particular registration by ID
// router.get('/registrations/:id', getRegistrationById);

// // Update a registration by ID
// router.patch('/registrations/:id', updateRegistration);

// Delete a registration by ID
router.delete("/registrations/:id", deleteRegistration);

export default router;
