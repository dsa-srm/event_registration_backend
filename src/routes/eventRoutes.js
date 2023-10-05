"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../controllers/eventController");
const router = express_1.default.Router();
// Update an event
router.patch("/events", eventController_1.updateEvent);
// Delete an event
router.delete("/events/:id", eventController_1.deleteEvent);
router.get("/events", eventController_1.getEventDetails); // fetching the event details
router.get("/events/getAllUsers/:id", eventController_1.getUsersForEvent);
router.post("/events", eventController_1.addEventDetails); // adding the event details
exports.default = router;
