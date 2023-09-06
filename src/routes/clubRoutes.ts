import express from 'express';
import { addClubDetails, getClubDetails } from '../controllers/clubController';

const router = express.Router();

router.post('/clubDetail',addClubDetails);
router.get('/clubDetail',getClubDetails);


export default router;