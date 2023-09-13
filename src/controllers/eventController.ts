import { Request, Response } from 'express';
import db from '../configs/aws';
import { v4 as uuidv4 } from "uuid";

// Update an event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id, name, max_allowed } = req.body; 

    if (!id) {
      return res.status(400).json({ message: 'Event ID is required' });
    }

    // Check if the event with the specified ID exists
    const existingEvent = await db.oneOrNone('SELECT * FROM public.events WHERE id = $1', [id]);

    if (!existingEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Update the event
    const updated_at = new Date().toISOString();
    await db.none('UPDATE public.events SET name = $1, max_allowed = $2, updated_at = $3 WHERE id = $4', [
      name,
      max_allowed,
      updated_at,
      id,
    ]);

    res.status(200).json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Error updating event', errorMessage: error });
  }
}

export const addEventDetails = async (req: Request, res: Response) => {
  try {
    const { eventName, club_id, max_allowed } = req.body;

    if (eventName === undefined || eventName === null || eventName === "") {
      res.status(400).json({ message: "Event name is required" });
      return;
    }

    const id = uuidv4().toString(); // generating unique id
    const created_at = new Date().toISOString(); // generating timestamp
    const updated_at = new Date().toISOString(); // generating timestamp
    const query = `INSERT INTO events(id, name, created_at, updated_at, club_id, max_allowed) VALUES($1, $2, $3, $4, $5, $6)`; // query to insert into the table

    try {
      await db.none(query, [
        `${id}`,
        `${eventName}`,
        `${created_at}`,
        `${updated_at}`,
        `${club_id}`,
        `${max_allowed}`,
      ]);
      res.status(201).json({ message: "Event record inserted successfully" }); // sending success response
    } catch (error:any) {
      if(error.code == '23503') {  
        res.status(500).json({ error: "Selected Club does not exist", errorMessage: error }); //sending error response
      return;
      }
      res.status(500).json({ error: "Error inserting event record", errorMessage: error }); // sending error response
    }
  } catch (err) {
    res.status(500).json({ error: err }); // sending error response
  }
};



// Delete an event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const query = 'DELETE FROM public.events WHERE id = $1';
    await db.none(query, [id]);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Error deleting event', errorMessage: error });
  }
};
export const getEventDetails = async (req: Request, res: Response) => {
  try {
    const query = `SELECT * FROM events`;

    try {
      const data = await db.any(query)

      res.status(200).json({ message: "Record fetched successfully", data: data })
    } catch (error) {
      res.status(500).json({ error: "Error fetching record", errorMessage: error })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
// Get users for a particular event
export const getUsersForEvent = async (req: Request, res: Response) => {
  const eventId = req.params.id;
  try {
    const users = await db.any(
      'SELECT u.* FROM public.registrations r INNER JOIN public.users u ON r.user_id = u.id WHERE r.user_event = $1',
      [eventId]
    );
    res.status(200).json({ message: 'Users for the event fetched successfully', data: users });
  } catch (error) {
    console.error('Error fetching users for event:', error);
    res.status(500).json({ error: 'Error fetching users for event', errorMessage: error });
  }
};