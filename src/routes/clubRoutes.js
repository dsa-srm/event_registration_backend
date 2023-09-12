"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clubController_1 = require("../controllers/clubController");
const router = express_1.default.Router();
router.post('/clubs', clubController_1.addClubDetails); //add club details
router.get('/clubs', clubController_1.getClubDetails); //get club details
// router.delete('/clubDetail',getClubDetails);   //get club details
// router.put('/clubDetail',getClubDetails);   //get club details
exports.default = router;
