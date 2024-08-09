import express from 'express';
import {
  getPembayaran,
  getPembayaranById,
  createPembayaran,
  deletePembayaran,
  updatePembayaran,
  tambahPembayaran,
} from "../controllers/pembayaranController.js";
import { processPembayaran } from '../controllers/prosesPembayaran.js';

const router = express.Router();

router.get('/pembayaran', getPembayaran);
router.get('/pembayaran/:id_pelanggan', getPembayaranById);
router.post('/pembayaran', createPembayaran);
router.patch('/pembayaran/:id', updatePembayaran);
router.delete("/pembayaran/:id", deletePembayaran)
router.post('/tambahpembayaran', tambahPembayaran);

  router.put('/prosesPembayaran', processPembayaran)

export default router;