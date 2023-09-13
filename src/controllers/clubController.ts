import { Request, Response } from "express";
import db from "../configs/aws";
import { v4 as uuidv4 } from "uuid";
// import generateToken from "../utils/tokenGenerator";
//write your code here
// if you code exceeds the max length of 50 lines, then write your code in parts inside service and export them here.

export const addClubDetails = async (req: Request, res: Response) => {
  try {
    const { clubName } = req.body;

    //checking if valid club name is provided
    if (clubName === undefined || clubName === null || clubName === "") {
      res.status(404).json({ message: "club name is required" });
      return;
    }

    const id = uuidv4().toString(); //generating unique id
    // const token = generateToken();  //generating token
    const created_at = new Date().toISOString();  //generating timestamp
    const updated_at = new Date().toISOString();  //generating timestamp
    const query = `INSERT INTO clubs(id,name,created_at,updated_at) VALUES($1,$2,$3,$4)`; //query to insert data
    try {
      await db.none(query, [  //inserting data
        `${id}`,
        `${clubName}`,
        // `${token}`,
        `${created_at}`,
        `${updated_at}`,
      ]);
      res.status(201).json({ message: "Record inserted successfully" });  //sending response
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error inserting record.", errorMessage: error }); //sending error response
    }
  } catch (err) {
    res.status(500).json({ error: err }); //sending error response
  }
};




export const getClubDetails = async (req: Request, res: Response) => {
  try {
    const query = `SELECT * FROM clubs`;  //query to fetch data
    try {
      const data = await db.any(query); //fetching data
      res
        .status(200)
        .json({ message: "Record fetched successfully", data: data });  //sending response
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching record.", errorMessage: error });  //sending error response
    }
  } catch (err) {
    res.status(500).json({ error: err }); //sending error response
  }
};



export const deleteClubDetails = async (req: Request, res: Response) => {
  try {
    const club_id = req.params.id;
    const query = `DELETE FROM clubs WHERE id = $1`;  //query to delete data
    try {
      await db.none(query, [club_id]); //deleting data
      res.status(200).json({ message: "Record deleted successfully" });  //sending response
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error deleting record.", errorMessage: error });  //sending error response
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" }); //sending error response
  }
}