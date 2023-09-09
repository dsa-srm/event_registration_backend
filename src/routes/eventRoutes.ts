import express from "express"

import { addEventDetails, getEventDetails } from "../controllers/eventController"

const router = express.Router()

router.get('/eventDetail', getEventDetails) // fetching the club details

router.post('/eventDetail', addEventDetails) // adding the club details

export default router