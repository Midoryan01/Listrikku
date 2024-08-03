import express from 'express';
import {
  getTagihan,
  getTagihanById,
  updateTagihan,
  deleteTagihan,
  getAllTagihan,
  updateTagihanStatus,
  
} from "../controllers/tagihanController.js";

const router = express.Router();

router.get('/tagihan', getTagihan);
router.get('/alltagihan', getAllTagihan);
router.get('/tagihan/:id_pelanggan', getTagihanById);
router.put('/tagihan/:id', updateTagihan);
router.patch('/tagihan/:id/status', updateTagihanStatus);
router.delete('/tagihan/:id', deleteTagihan);
export default router;