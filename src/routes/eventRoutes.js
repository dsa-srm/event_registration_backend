"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../controllers/eventController");
const router = express_1.default.Router();
router.get('/eventDetail', eventController_1.getEventDetails); // fetching the club details
router.post('/eventDetail', eventController_1.addEventDetails); // adding the club details
exports.default = router;
