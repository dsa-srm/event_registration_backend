"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventQueries = void 0;
class EventQueries {
    static fetchMaxAllowed(t, user_event) {
        return __awaiter(this, void 0, void 0, function* () {
            return t.oneOrNone("SELECT max_allowed FROM public.events WHERE id = $1 FOR UPDATE", [user_event]);
        });
    }
    static updateMaxAllowed(t, updatedMaxAllowed, user_event) {
        return __awaiter(this, void 0, void 0, function* () {
            return t.none("UPDATE public.events SET max_allowed = $1 WHERE id = $2", [
                updatedMaxAllowed,
                user_event,
            ]);
        });
    }
}
exports.EventQueries = EventQueries;
