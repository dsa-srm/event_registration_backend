export class EventQueries {
	static async fetchMaxAllowed(t: any, user_event: string) {
		return t.oneOrNone(
			"SELECT max_allowed FROM public.events WHERE id = $1 FOR UPDATE",
			[user_event]
		);
	}

	static async updateMaxAllowed(
		t: any,
		updatedMaxAllowed: number,
		user_event: string
	) {
		return t.none("UPDATE public.events SET max_allowed = $1 WHERE id = $2", [
			updatedMaxAllowed,
			user_event,
		]);
	}
}
