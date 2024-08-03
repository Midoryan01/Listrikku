import Penggunaan from "../models/Penggunaan.js";

/**
 * Mendapatkan semua penggunaan.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan semua data penggunaan.
 */
export const getPenggunaan = async (req, res) => {
  try {
    const penggunaan = await Penggunaan.findAll({
      attributes: [
        'id_penggunaan',
        'id_pelanggan',
        'bulan',
        'tahun',
        'meter_awal',
        'meter_akhir'
      ]
    });
    res.json(penggunaan);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Mendapatkan penggunaan berdasarkan ID pelanggan.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan data penggunaan berdasarkan ID pelanggan.
 */
export const getPenggunaanById = async (req, res) => {
  try {
    const penggunaan = await Penggunaan.findAll({
      where: { id_pelanggan: req.params.id_pelanggan }
    });
    res.status(200).json(penggunaan);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Membuat penggunaan baru.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan pesan sukses.
 */
export const createPenggunaan = async (req, res) => {
  const { id_pelanggan, bulan, tahun, meter_awal, meter_akhir } = req.body;
  try {
    await Penggunaan.create({
      id_pelanggan: id_pelanggan,
      bulan: bulan,
      tahun: tahun,
      meter_awal: meter_awal,
      meter_akhir: meter_akhir
    });
    res.status(201).json({ msg: "Penggunaan berhasil dibuat" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Memperbarui penggunaan berdasarkan ID.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan pesan sukses.
 */
export const updatePenggunaan = async (req, res) => {
  const { id_pelanggan, bulan, tahun, meter_awal, meter_akhir } = req.body;
  try {
    const penggunaan = await Penggunaan.findByPk(req.params.id);
    if (!penggunaan) return res.status(404).json({ msg: "Penggunaan tidak ditemukan" });

    penggunaan.id_pelanggan = id_pelanggan;
    penggunaan.bulan = bulan;
    penggunaan.tahun = tahun;
    penggunaan.meter_awal = meter_awal;
    penggunaan.meter_akhir = meter_akhir;

    await penggunaan.save();
    res.status(200).json({ msg: "Penggunaan berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Memperbarui sebagian penggunaan berdasarkan ID.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan pesan sukses.
 */
export const updatePenggunaanPartial = async (req, res) => {
  try {
    const penggunaan = await Penggunaan.findByPk(req.params.id);
    if (!penggunaan) return res.status(404).json({ msg: "Penggunaan tidak ditemukan" });

    const {  bulan, tahun, meter_awal, meter_akhir } = req.body;

    let hasChanged = false;

    
    if (bulan !== undefined && penggunaan.bulan !== bulan) {
      penggunaan.bulan = bulan;
      penggunaan.changed('bulan', true);
      hasChanged = true;
    }
    if (tahun !== undefined && penggunaan.tahun !== tahun) {
      penggunaan.tahun = tahun;
      penggunaan.changed('tahun', true);
      hasChanged = true;
    }
    if (meter_awal !== undefined && penggunaan.meter_awal !== meter_awal) {
      penggunaan.meter_awal = meter_awal;
      penggunaan.changed('meter_awal', true);
      hasChanged = true;
    }
    if (meter_akhir !== undefined && penggunaan.meter_akhir !== meter_akhir) {
      penggunaan.meter_akhir = meter_akhir;
      penggunaan.changed('meter_akhir', true);
      hasChanged = true;
    }

    if (hasChanged) {
      await penggunaan.save();
      res.status(200).json({ msg: "Penggunaan berhasil diupdate" });
    } else {
      res.status(200).json({ msg: "Tidak ada perubahan yang perlu disimpan" });
    }
  } catch (error) {
    console.error('Error updating penggunaan:', error);
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Menghapus penggunaan berdasarkan ID.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan pesan sukses.
 */
export const deletePenggunaan = async (req, res) => {
  try {
    const penggunaan = await Penggunaan.findByPk(req.params.id);
    if (!penggunaan) return res.status(404).json({ msg: "Penggunaan tidak ditemukan" });

    await penggunaan.destroy();
    res.status(200).json({ msg: "Penggunaan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
