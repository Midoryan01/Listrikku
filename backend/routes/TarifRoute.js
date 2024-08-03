import express from 'express';
import { 
  createTarif,
  getTarif, 
  updateTarif, 
  deleteTarif } from '../controllers/tarif.js';

const router = express.Router();
router.get('/tarif', getTarif);
router.put('/tarif/:id', updateTarif);
router.post("/tarif",  createTarif);
router.delete('/tarif/:id', deleteTarif);

export default router;
