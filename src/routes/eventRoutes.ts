import express from 'express';

import {addEventDetails, getEventDetails, updateEvent, deleteEvent, getUsersForEvent } from '../controllers/eventController';

const router = express.Router();

// Update an event
router.patch('/events', updateEvent);
// Delete an event
router.delete('/events/:id', deleteEvent);
router.get('/events', getEventDetails) // fetching the club details
router.get('/events/getAllUsers/:id',getUsersForEvent)
router.post('/events', addEventDetails) // adding the club details

export default router
