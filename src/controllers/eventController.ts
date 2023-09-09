import { Response, Request } from "express";
import db from "../configs/aws";
import { v4 as uuidv4 } from "uuid";

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
    } catch (error) {
      res.status(500).json({ error: "Error inserting event record", errorMessage: error }); // sending error response
    }
  } catch (err) {
    res.status(500).json({ error: err }); // sending error response
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