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
exports.getClubDetails = exports.addClubDetails = void 0;
//write your code here
// if you code exceeds the max length of 50 lines, then write your code in parts inside service and export them here.
const addClubDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clubName } = req.body;
        if (clubName === undefined || clubName === null || clubName === "" || clubName === 0) {
            console.log(clubName);
            res.status(404).json({ "message": "club name is required" });
            return;
        }
        res.send({ "message": "club name is required" });
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching data.', errorMessage: error });
    }
});
exports.addClubDetails = addClubDetails;
const getClubDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside get");
    res.send('Hello, TypeScript Backend!');
});
exports.getClubDetails = getClubDetails;
