import express from 'express';
import {
    getPelanggan,
    getPelangganById,
    createPelanggan,
    updatePelanggan,
    deletePelanggan
} from '../controllers/pelangganController.js';

const router = express.Router();

router.get('/pelanggan', getPelanggan);
router.get('/pelanggan/:id', getPelangganById);
router.post('/pelanggan', createPelanggan);
router.patch('/pelanggan/:id', updatePelanggan);
router.delete('/pelanggan/:id', deletePelanggan);

export default router;
