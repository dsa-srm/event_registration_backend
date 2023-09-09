import express from 'express';

import {addEventDetails, getEventDetails, updateEvent, deleteEvent } from '../controllers/eventController';

const router = express.Router();

// Update an event
router.patch('/eventDetail', updateEvent);
// Delete an event
router.delete('/eventDetail/:id', deleteEvent);

router.get('/eventDetail', getEventDetails) // fetching the club details

router.post('/eventDetail', addEventDetails) // adding the club details

export default router
