import Pembayaran from '../models/Pembayaran.js';
import Tagihan from "../models/Tagihan.js";

// Update status tagihan dan informasi pembayaran
export const processPembayaran = async (req, res) => {
  const { id_pembayaran, total_bayar } = req.body; // Hapus bulan_bayar dan tanggal_pembayaran dari req.body
  try {
      // Update pembayaran
      const pembayaran = await Pembayaran.findByPk(id_pembayaran);
      if (!pembayaran) {
          return res.status(404).json({ msg: "Pembayaran tidak ditemukan" });
      }

      // Set tanggal pembayaran ke tanggal saat ini
      const currentDate = new Date();
      pembayaran.tanggal_pembayaran = currentDate.toISOString(); // Format tanggal dalam ISO 8601
      
      // Set bulan bayar hanya dengan bulan (format MM-YYYY)
      const month = currentDate.toLocaleString('default', { month: 'long' }); // Format bulan seperti "August"
      pembayaran.bulan_bayar = month;

      pembayaran.total_bayar = total_bayar;
      
      await pembayaran.save();

      // Update status tagihan menjadi "Lunas"
      const tagihan = await Tagihan.findByPk(pembayaran.id_tagihan);
      if (tagihan) {
          tagihan.status = 'Lunas'; // Set status tagihan
          await tagihan.save();
      } else {
          return res.status(404).json({ msg: "Tagihan tidak ditemukan" });
      }

      res.status(200).json({ msg: "Pembayaran berhasil diproses", pembayaran });
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: error.message });
  }
};
