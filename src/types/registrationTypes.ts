// types/RegistrationTypes.ts

export interface RegistrationInfo {
	name: string;
	phone: string;
	reg: string;
	email: string;
	department: string;
	year: number;
	// user_club: string;
	user_event: string;
}

export interface EventInfo {
	max_allowed: number;
}

export interface ExistingUser {
	id: string;
}

export interface ExistingRegistration {
	id: string;
}
