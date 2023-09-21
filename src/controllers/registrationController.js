"use strict";
// controllers/RegistrationController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationController = void 0;
const registrationService_1 = require("../services/registrationService");
class RegistrationController {
    static getAllRegistrations(req, res) {
        registrationService_1.RegistrationService.getAllRegistrations(req, res);
    }
    static deleteRegistration(req, res) {
        registrationService_1.RegistrationService.deleteRegistration(req, res);
    }
    static registerUserForEvent(req, res) {
        registrationService_1.RegistrationService.registerUserForEvent(req, res);
    }
}
exports.RegistrationController = RegistrationController;
