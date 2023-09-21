"use strict";
// queries/registrationQueries.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationQueries = void 0;
const aws_1 = __importDefault(require("../configs/aws"));
class RegistrationQueries {
    static fetchAllRegistrations() {
        return __awaiter(this, void 0, void 0, function* () {
            return aws_1.default.any("SELECT * FROM public.registrations");
        });
    }
    static fetchRegistrationById(registrationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return aws_1.default.oneOrNone("SELECT * FROM public.registrations WHERE id = $1", [
                registrationId,
            ]);
        });
    }
    static updateRegistration(registrationId, user_id, user_club, user_event) {
        return __awaiter(this, void 0, void 0, function* () {
            yield aws_1.default.none("UPDATE public.registrations SET user_id = $1, user_club = $2, user_event = $3 WHERE id = $4", [user_id, user_club, user_event, registrationId]);
        });
    }
    static deleteRegistration(registrationId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield aws_1.default.none("DELETE FROM public.registrations WHERE id = $1", [
                registrationId,
            ]);
        });
    }
    static checkUserAlreadyRegistered(t, id, user_event) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield t.oneOrNone("SELECT id FROM public.registrations WHERE user_id = $1 AND user_event = $2", [id, user_event]);
        });
    }
    static registerUser(t, registrationId, id, user_club, user_event, registration_created_at, registration_updated_at) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield t.none("INSERT INTO public.registrations(id, user_id, user_club, user_event, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6)", [
                registrationId,
                id,
                user_club,
                user_event,
                registration_created_at,
                registration_updated_at,
            ]);
        });
    }
}
exports.RegistrationQueries = RegistrationQueries;
