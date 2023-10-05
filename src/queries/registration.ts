// queries/registrationQueries.ts

import db from "../configs/aws";

export class RegistrationQueries {
	static async fetchAllRegistrations() {
		return db.any("SELECT * FROM public.registrations");
	}

	static async fetchRegistrationById(registrationId: string) {
		return db.oneOrNone("SELECT * FROM public.registrations WHERE id = $1", [
			registrationId,
		]);
	}

	static async updateRegistration(
		registrationId: string,
		user_id: string,
		// user_club: string,
		user_event: string
	) {
		await db.none(
			"UPDATE public.registrations SET user_id = $1, user_event = $2 WHERE id = $3",
			[user_id, user_event, registrationId]
		);
	}

	static async deleteRegistration(registrationId: string) {
		await db.none("DELETE FROM public.registrations WHERE id = $1", [
			registrationId,
		]);
	}

	static async checkUserAlreadyRegistered(
		t: any,
		id: string,
		user_event: string
	) {
		return await t.oneOrNone(
			"SELECT id FROM public.registrations WHERE user_id = $1 AND user_event = $2",
			[id, user_event]
		);
	}

	static async registerUser(
		t: any,
		registrationId: string,
		id: string,
		// user_club: string,
		user_event: string,
		registration_created_at: string,
		registration_updated_at: string
	) {
		return await t.none(
			"INSERT INTO public.registrations(id, user_id, user_event, created_at, updated_at) VALUES($1, $2, $3, $4, $5)",
			[
				registrationId,
				id,
				// user_club,
				user_event,
				registration_created_at,
				registration_updated_at,
			]
		);
	}
}
