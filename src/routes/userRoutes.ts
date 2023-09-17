import express from 'express';
import {
  createUser,
  getUserDetails,
  getAllUsers,
  getUserEvents
} from '../controllers/userController';

import { registerUserForEvent } from '../controllers/registrationController';

const router = express.Router();
router.get('/users',getAllUsers)

// Create a new user
router.post('/users', createUser);

// // Update a user
// router.patch('/users/:id', updateUser);

// // Delete a user
// router.delete('/users/:id', deleteUser);

// Fetch user details
router.get('/users/:id', getUserDetails);

//Get all the user events by the register_number
router.get('/users/getAllEvents/:reg_no',getUserEvents)
export default router;
