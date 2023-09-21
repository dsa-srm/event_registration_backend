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
exports.UserQueries = void 0;
class UserQueries {
    static fetchUserByReg(t, reg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield t.oneOrNone("SELECT id FROM public.users WHERE reg = $1", [
                reg,
            ]);
        });
    }
    static addUser(t, id, name, phone, reg, email, department, year, created_at, updated_at) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield t.none("INSERT INTO public.users(id, name, phone, reg, email, department, year, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)", [id, name, phone, reg, email, department, year, created_at, updated_at]);
        });
    }
}
exports.UserQueries = UserQueries;
