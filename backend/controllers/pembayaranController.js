import Pembayaran from '../models/Pembayaran.js';
import Tagihan from '../models/Tagihan.js';
import Tarif from '../models/Tarif.js';
import Pelanggan from '../models/Pelanggan.js';

/**
 * Mendapatkan semua pembayaran.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan semua data pembayaran.
 */
export const getPembayaran = async (req, res) => {
    try {
        const pembayaran = await Pembayaran.findAll({
            attributes: [
                'id_pembayaran',
                'id_tagihan',
                'id_pelanggan',
                'tanggal_pembayaran',
                'bulan_bayar',
                'biaya_admin',
                'total_bayar',
                'id_user'
            ]
        });
        res.json(pembayaran);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Mendapatkan pembayaran berdasarkan ID pelanggan.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan data pembayaran berdasarkan ID pelanggan.
 */
export const getPembayaranById = async (req, res) => {
    try {
        const pembayaran = await Pembayaran.findAll({
            where: { id_pelanggan: req.params.id_pelanggan }
        });
        res.status(200).json(pembayaran);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

/**
 * Membuat pembayaran baru.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan pesan sukses.
 */
export const createPembayaran = async (req, res) => {
    const { id_tagihan, id_pelanggan, tanggal_pembayaran, bulan_bayar, total_bayar, biaya_admin, id_user } = req.body;
    try {
        await Pembayaran.create({
            id_tagihan: id_tagihan,
            id_pelanggan: id_pelanggan,
            tanggal_pembayaran: tanggal_pembayaran,
            bulan_bayar: bulan_bayar,
            biaya_admin: biaya_admin,
            total_bayar: total_bayar,
            id_user: id_user
        });
        res.status(201).json({ msg: "Pembayaran berhasil dibuat" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Memperbarui pembayaran berdasarkan ID.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan pesan sukses dan data pembayaran yang diperbarui.
 */
export const updatePembayaran = async (req, res) => {
    const { tanggal_pembayaran, bulan_bayar, biaya_admin, total_bayar, id_user } = req.body;
    try {
        console.log(`Update request for id: ${req.params.id}`);
        console.log(`Request body: ${JSON.stringify(req.body)}`);

        const pembayaran = await Pembayaran.findByPk(req.params.id);
        if (!pembayaran) {
            return res.status(404).json({ msg: "Pembayaran tidak ditemukan" });
        }

        // Update fields only if they are provided in the request body
        if (tanggal_pembayaran !== undefined) pembayaran.tanggal_pembayaran = tanggal_pembayaran;
        if (bulan_bayar !== undefined) pembayaran.bulan_bayar = bulan_bayar;
        if (biaya_admin !== undefined) pembayaran.biaya_admin = biaya_admin;
        if (total_bayar !== undefined) pembayaran.total_bayar = total_bayar;
        if (id_user !== undefined) pembayaran.id_user = id_user;

        await pembayaran.save();
        console.log(`Pembayaran after update: ${JSON.stringify(pembayaran)}`);

        res.status(200).json({ msg: "Pembayaran berhasil diperbarui", pembayaran });
    } catch (error) {
        console.error(`Error updating pembayaran: ${error.message}`);
        res.status(500).json({ msg: error.message });
    }
};

/**
 * Menghapus pembayaran berdasarkan ID.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan pesan sukses.
 */
export const deletePembayaran = async (req, res) => {
    try {
        const tagihan = await Pembayaran.findByPk(req.params.id);
        if (!tagihan) return res.status(404).json({ msg: "Pembayaran tidak ditemukan" });

        await tagihan.destroy();
        res.status(200).json({ msg: "Pembayaran berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const tambahPembayaran = async (req, res) => {
    try {
      const { id_tagihan, tanggal_pembayaran, bulan_bayar } = req.body;
      const id_user = req.user.id_user; // Assuming you have user info in req.user
  
      // Fetch tagihan data
      const tagihan = await Tagihan.findByPk(id_tagihan, {
        include: {
          model: Pelanggan,
          include: [Tarif]
        }
      });
  
      if (!tagihan) {
        return res.status(404).json({ msg: 'Tagihan tidak ditemukan' });
      }
  
      const jumlah_meter = tagihan.jumlah_meter;
      const tarif_per_kwh = tagihan.Pelanggan.Tarif.tarif_per_kwh;
      const total_bayar = jumlah_meter * tarif_per_kwh + 2500; // Adding fixed admin fee
  
      const pembayaran = await Pembayaran.create({
        id_tagihan,
        id_user,
        tanggal_pembayaran,
        bulan_bayar,
        total_bayar
      });
  
      res.status(201).json(pembayaran);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Terjadi kesalahan server' });
    }
  };