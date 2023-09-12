import express from 'express';

import { addClubDetails, getClubDetails } from '../controllers/clubController';

const router = express.Router();

router.post('/clubs',addClubDetails);  //add club details
router.get('/clubs',getClubDetails);   //get club details
// router.delete('/clubDetail',getClubDetails);   //get club details
// router.put('/clubDetail',getClubDetails);   //get club details


export default router;