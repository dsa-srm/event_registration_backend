import { Request, Response } from 'express';
import db from '../configs/aws';

// Update an event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { event_id, name, max_allowed } = req.body;

    if (!event_id) {
      return res.status(400).json({ message: 'Event ID is required' });
    }

    // Check if the event with the specified ID exists
    const existingEvent = await db.oneOrNone('SELECT * FROM public.events WHERE id = $1', [event_id]);

    if (!existingEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Update the event
    const updated_at = new Date().toISOString();
    await db.none('UPDATE public.events SET name = $1, max_allowed = $2, updated_at = $3 WHERE id = $4', [
      name,
      max_allowed,
      updated_at,
      event_id,
    ]);

    res.status(200).json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Error updating event', errorMessage: error });
  }
};


// Delete an event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { event_id } = req.body;

    const query = 'DELETE FROM public.events WHERE id = $1';
    await db.none(query, [event_id]);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Error deleting event', errorMessage: error });
  }
};
