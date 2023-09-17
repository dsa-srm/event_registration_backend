import { Request, Response } from "express";
import db from "../configs/aws";
import { v4 as uuidv4 } from "uuid";

export const registerUserForEvent = async (req: Request, res: Response) => {
	try {
		const { name, phone, reg, email, department, year, user_club, user_event } =
			req.body;

		// Validate required fields
		if (
			!name ||
			!phone ||
			!reg ||
			!email ||
			!department ||
			!year ||
			!user_club ||
			!user_event
		) {
			return res.status(400).json({ message: "All fields are required" });
		}
		// Start a PostgreSQL transaction with Serializable isolation level
		await db.tx(async (t) => {
			// Count the number of registrations for the event
			const registrationCountResult = await t.one(
				"SELECT COUNT(*) FROM public.registrations WHERE user_event = $1",
				[user_event]
			);

			// Fetch the max_allowed value for the event and check if the event exists
			const eventInfo = await db.oneOrNone(
				"SELECT max_allowed FROM public.events WHERE id = $1 FOR UPDATE",
				[user_event]
			);

			if (!eventInfo) {
				// Event not found, return an error
				return res.status(404).json({
					message:
						"Event not found or someone else is booking. Please try again",
				});
			}

			const maxAllowed = eventInfo.max_allowed;

			const registrationCount = parseInt(registrationCountResult.count, 10);

			// Check if booking is possible
			if (registrationCount >= maxAllowed) {
				return res.status(400).json({ message: "Event is fully booked" });
			}

			// Check if user with the same registration number already exists
			const existingUser = await t.oneOrNone(
				"SELECT id FROM public.users WHERE reg = $1",
				[reg]
			);
			let id;
			if (existingUser) {
				id = existingUser.id;
			} else {
				// Generate timestamps
				const created_at = new Date().toISOString();
				const updated_at = new Date().toISOString();
				id = uuidv4().toString();

				// Insert user into the database
				await t.none(
					"INSERT INTO public.users(id, name, phone, reg, email, department, year, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
					[
						id,
						name,
						phone,
						reg,
						email,
						department,
						year,
						created_at,
						updated_at,
					]
				);
			}
			// Check if the user is already registered for the same event
			const existingRegistration = await t.oneOrNone(
				"SELECT * FROM public.registrations WHERE user_id = $1 AND user_event = $2",
				[id, user_event]
			);

			if (existingRegistration) {
				return res
					.status(400)
					.json({ message: "User is already registered for this event" });
			}
			// Generate a unique registration ID
			const registrationId = uuidv4().toString();
			const created_at = new Date().toISOString();
			const updated_at = new Date().toISOString();

			// Insert the registration into the registrations table
			await t.none(
				"INSERT INTO public.registrations(id, user_id, user_club, user_event, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6)",
				[registrationId, id, user_club, user_event, created_at, updated_at]
			);

			res.status(201).json({ message: "User registered for the event" });
		});
	} catch (error) {
		console.error("Error registering user for event:", error);
		res.status(500).json({
			error: "Error registering user for event",
			errorMessage: error, // Use error.message to capture the error message
		});
	}
};

// Get all registrations
export const getAllRegistrations = async (req: Request, res: Response) => {
	try {
		const registrations = await db.any("SELECT * FROM public.registrations");
		res.status(200).json({
			message: "Registrations fetched successfully",
			data: registrations,
		});
	} catch (error) {
		console.error("Error fetching registrations:", error);
		res
			.status(500)
			.json({ error: "Error fetching registrations", errorMessage: error });
	}
};

// // Get a particular registration by ID
// export const getRegistrationById = async (req: Request, res: Response) => {
//   const registrationId = req.params.id;

//   try {
//     const registration = await db.oneOrNone('SELECT * FROM public.registrations WHERE id = $1', [registrationId]);

//     if (registration) {
//       res.status(200).json({ message: 'Registration fetched successfully', data: registration });
//     } else {
//       res.status(404).json({ message: 'Registration not found' });
//     }
//   } catch (error) {
//     console.error('Error fetching registration by ID:', error);
//     res.status(500).json({ error: 'Error fetching registration', errorMessage: error });
//   }
// };

// Update a registration by ID
// export const updateRegistration = async (req: Request, res: Response) => {
//   const registrationId = req.params.id;
//   const { user_id, user_club, user_event } = req.body;

//   try {
//     // Implement the code for updating a registration by ID here
//     // This controller is responsible for updating an existing registration
//   } catch (error) {
//     console.error('Error updating registration:', error);
//     res.status(500).json({ error: 'Error updating registration', errorMessage: error });
//   }
// };

// Delete a registration by ID
export const deleteRegistration = async (req: Request, res: Response) => {
	const registrationId = req.params.id;

	try {
		// Implement the code for deleting a registration by ID here
		// This controller is responsible for deleting an existing registration
		await db.none("DELETE FROM public.registrations WHERE id = $1", [
			registrationId,
		]);
		res.status(200).json({ message: "User unregistered successfully" });
	} catch (error) {
		console.error("Error deleting registration:", error);
		res
			.status(500)
			.json({ error: "Error deleting registration", errorMessage: error });
	}
};
