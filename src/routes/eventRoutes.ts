import express from 'express';

import { updateEvent, deleteEvent } from '../controllers/eventController';

const router = express.Router();

// Update an event
router.patch('/eventDetail', updateEvent);

// Delete an event
router.delete('/eventDetail', deleteEvent);

export default router;
