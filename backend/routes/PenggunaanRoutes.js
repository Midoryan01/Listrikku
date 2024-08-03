import express from 'express';
import {
  getPenggunaan,
  getPenggunaanById,
  createPenggunaan,
  deletePenggunaan,
  updatePenggunaan,
  updatePenggunaanPartial,
} from "../controllers/penggunaanController.js";

const router = express.Router();

router.get('/penggunaan',getPenggunaan);
router.get('/penggunaan/:id_pelanggan', getPenggunaanById);
router.post('/penggunaan', createPenggunaan);
router.put('/penggunaan/id', updatePenggunaan);
router.patch('/penggunaanpartial/:id', updatePenggunaanPartial);
router.delete('/penggunaan/:id', deletePenggunaan);

export default router;