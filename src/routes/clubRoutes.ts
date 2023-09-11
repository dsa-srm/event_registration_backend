import express from 'express';

import { addClubDetails, getClubDetails } from '../controllers/clubController';

const router = express.Router();

router.post('/clubDetail',addClubDetails);  //add club details
router.get('/clubDetail',getClubDetails);   //get club details
// router.delete('/clubDetail',getClubDetails);   //get club details
// router.put('/clubDetail',getClubDetails);   //get club details


export default router;