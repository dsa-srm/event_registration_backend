// controllers/RegistrationController.ts

import { Request, Response } from "express";
import { RegistrationService } from "../services/registrationService";

export class RegistrationController {
	static getAllRegistrations(req: Request, res: Response) {
		RegistrationService.getAllRegistrations(req, res);
	}

	static deleteRegistration(req: Request, res: Response) {
		RegistrationService.deleteRegistration(req, res);
	}

	static registerUserForEvent(req: Request, res: Response) {
		RegistrationService.registerUserForEvent(req, res);
	}
}
