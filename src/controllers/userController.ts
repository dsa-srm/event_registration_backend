import { NextFunction, Request, Response } from 'express';
import db from '../configs/aws'; // Assuming you have a database configuration set up
import { v4 as uuidv4 } from 'uuid';

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.any('SELECT * FROM public.users');
    res.status(200).json({ message: 'All users fetched successfully', data: users });
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ error: 'Error fetching all users', errorMessage: error });
  }
};


// Create a new user
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, phone, reg, email, department, year } = req.body;

    // Validate required fields
    if (!name || !phone || !reg || !email || !department || !year) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user with the same registration number already exists
    const existingUser = await db.oneOrNone('SELECT id FROM public.users WHERE reg = $1', [reg]);

    if (existingUser) {
      req.body.user_id = existingUser.id;
      return next();
    }

    // Generate timestamps
    const created_at = new Date().toISOString();
    const updated_at = new Date().toISOString();
    const id = uuidv4().toString();

    // Insert user into the database
    await db.none(
      'INSERT INTO public.users(id, name, phone, reg, email, department, year, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [id, name, phone, reg, email, department, year, created_at, updated_at]
    );
    req.body.user_id = id;
    next();
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user', errorMessage: error });
  }
};


// Update a user
// export const updateUser = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     const { name, phone, reg, email, department, year } = req.body;

//     // Check if the user with the specified ID exists
//     const existingUser = await db.oneOrNone(
//       'SELECT * FROM public.users WHERE id = $1',
//       [id]
//     );

//     if (!existingUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Update the user
//     const updated_at = new Date().toISOString();
//     await db.none(
//       'UPDATE public.users SET name = $1, phone = $2, reg = $3, email = $4, department = $5, year = $6, updated_at = $7 WHERE id = $8',
//       [name, phone, reg, email, department, year, updated_at, id]
//     );
    
//     res.status(200).json({ message: 'User updated successfully' });
//   } catch (error) {
//     console.error('Error updating user:', error);
//     res.status(500).json({ error: 'Error updating user', errorMessage: error });
//   }
// };

// Delete a user
// export const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id;

//     // Delete the user with the specified ID
//     await db.none('DELETE FROM public.users WHERE id = $1', [id]);

//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ error: 'Error deleting user', errorMessage: error });
//   }
// };

// const users = await db.any(
//   'SELECT u.* FROM public.registrations r INNER JOIN public.users u ON r.user_id = u.id WHERE r.user_event = $1',
//   [eventId]
// );

// Fetch user details
export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // Retrieve user details based on the specified ID
    const user = await db.oneOrNone(
      'SELECT * FROM public.users WHERE id = $1',
      [id]
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const events = await db.any('SELECT u.id , u.name  FROM public.registrations r INNER JOIN public.events u ON r.user_event = u.id WHERE r.user_id = $1',
    [id])

    user.events = events

    res.status(200).json({ message: 'User details fetched successfully', user });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res
      .status(500)
      .json({ error: 'Error fetching user details', errorMessage: error });
  }
};

//Get all the events a user have registered for based on his registration number

// SELECT e.id, e.name
// FROM public.events e
// INNER JOIN public.registrations r ON e.id = r.user_event
// WHERE r.user_id = (SELECT id FROM public.users WHERE register_number = $1);

// Fetch user details
export const getUserEvents = async (req: Request, res: Response) => {
  try {
    const reg_no = req.params.reg_no;

    const events = await db.any('SELECT e.id, e.name FROM public.events e INNER JOIN public.registrations r ON e.id = r.user_event WHERE r.user_id = (SELECT id FROM public.users WHERE reg = $1);',
    [reg_no]
    )

    res.status(200).json({ message: 'User events fetched successfully', events:events });
  } catch (error) {
    console.error('Error fetching event details:', error);
    res
      .status(500)
      .json({ error: 'Error fetching event details', errorMessage: error });
  }
};