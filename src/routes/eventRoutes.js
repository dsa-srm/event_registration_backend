"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../controllers/eventController");
const router = express_1.default.Router();
// Update an event
router.patch('/eventDetail', eventController_1.updateEvent);
// Delete an event
router.delete('/eventDetail', eventController_1.deleteEvent);
exports.default = router;
