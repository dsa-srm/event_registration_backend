// services/RegistrationService.ts

import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { RegistrationQueries } from "../queries/registration";
import { UserQueries } from "../queries/users";
import { EventQueries } from "../queries/events";
import db from "../configs/aws";

export class RegistrationService {
	static async registerUserForEvent(req: Request, res: Response) {
		try {
			const {
				name,
				phone,
				reg,
				email,
				department,
				year,
				// user_club,
				user_event,
			} = req.body;

			await db.tx(async (t) => {
				// Fetch the max_allowed value for the event and check if the event exists
				const eventInfo = await EventQueries.fetchMaxAllowed(t, user_event);

				if (!eventInfo) {
					// Event not found, return an error
					return res.status(404).json({
						message:
							"Event not found or someone else is booking. Please try again",
					});
				}

				const maxAllowed = eventInfo.max_allowed;

				// Check if booking is possible
				if (maxAllowed <= 0) {
					return res.status(400).json({ message: "Event is fully booked" });
				} else {
					// You can update the max_allowed value here based on your business logic
					// For example, decrement it by 1 to simulate a booking
					const updatedMaxAllowed = maxAllowed - 1;

					// Update the max_allowed value in the events table
					await EventQueries.updateMaxAllowed(t, updatedMaxAllowed, user_event);

					// Check if user with the same registration number already exists
					const existingUser = await UserQueries.fetchUserByRegAndMail(
						t,
						reg,
						email
					);
					let id;

					if (existingUser) {
						id = existingUser.id;
						// Check if the user with the same registration number is already registered for the event
						const existingRegistration =
							await RegistrationQueries.checkUserAlreadyRegistered(
								t,
								id,
								user_event
							);

						if (existingRegistration) {
							return res
								.status(400)
								.json({ message: "User is already registered for the event" });
						}
					} else {
						// Generate timestamps
						const created_at = new Date().toISOString();
						const updated_at = new Date().toISOString();
						id = uuidv4().toString();

						// Insert user into the database
						await UserQueries.addUser(
							t,
							id,
							name,
							phone,
							reg,
							email,
							department,
							year,
							created_at,
							updated_at
						);
					}

					// Generate a unique registration ID
					const registrationId = uuidv4().toString();
					const registration_created_at = new Date().toISOString();
					const registration_updated_at = new Date().toISOString();

					// Insert the registration into the registrations table
					await RegistrationQueries.registerUser(
						t,
						registrationId,
						id,
						// user_club,
						user_event,
						registration_created_at,
						registration_updated_at
					);

					res.status(201).json({ message: "User registered for the event" });
				}
			});
		} catch (error) {
			console.error("Error registering user for event:", error);
			res.status(500).json({
				error: "Error registering user for event",
				errorMessage: error,
			});
		}
	}

	static async getAllRegistrations(req: Request, res: Response) {
		try {
			const registrations = await RegistrationQueries.fetchAllRegistrations();
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
	}

	static async deleteRegistration(req: Request, res: Response) {
		const registrationId = req.params.id;

		try {
			await RegistrationQueries.deleteRegistration(registrationId);
			res.status(200).json({ message: "User unregistered successfully" });
		} catch (error) {
			console.error("Error deleting registration:", error);
			res
				.status(500)
				.json({ error: "Error deleting registration", errorMessage: error });
		}
	}
}
