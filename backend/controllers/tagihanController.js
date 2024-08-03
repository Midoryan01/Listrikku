import Tagihan from "../models/Tagihan.js";
import Pelanggan from "../models/Pelanggan.js";
import Tarif from "../models/Tarif.js";
import db from "../config/Database.js";

/**
 * Mendapatkan semua tagihan dengan nama pelanggan.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan semua data tagihan dan nama pelanggan.
 */
export const getTagihan = async (req, res) => {
  try {
    const [results, fields] = await db.query(`
      SELECT t.id_tagihan, t.id_pelanggan, p.nama_pelanggan 
      FROM tagihan t 
      JOIN pelanggan p ON t.id_pelanggan = p.id_pelanggan
    `);
    res.json(results);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Menampilkan semua tagihan.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan semua data tagihan.
 */
export const getAllTagihan = async (req, res) => {
  try {
    const results = await Tagihan.findAll({
      attributes: ['id_tagihan', 'id_pelanggan', 'bulan', 'tahun', 'jumlah_meter', 'status'],
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Menampilkan tagihan berdasarkan ID pelanggan.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan data tagihan berdasarkan ID pelanggan.
 */
export const getTagihanById = async (req, res) => {
  try {
    const { id_pelanggan } = req.params; 
    const tagihan = await Tagihan.findAll({
      where: { id_pelanggan: id_pelanggan }
    });
    if (tagihan.length === 0) return res.status(404).json({ msg: "Tagihan tidak ditemukan" });
    res.status(200).json(tagihan);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Mengupdate tagihan berdasarkan ID tagihan.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan pesan sukses.
 */
export const updateTagihan = async (req, res) => {
  const { id_penggunaan, id_pelanggan, bulan, tahun, jumlah_meter, status } = req.body;
  try {
    const tagihan = await Tagihan.findByPk(req.params.id);
    if (!tagihan) return res.status(404).json({ msg: "Tagihan tidak ditemukan" });

    tagihan.id_penggunaan = id_penggunaan;
    tagihan.id_pelanggan = id_pelanggan;
    tagihan.bulan = bulan;
    tagihan.tahun = tahun;
    tagihan.jumlah_meter = jumlah_meter;
    tagihan.status = status;
    await tagihan.save();

    res.status(200).json({ msg: "Tagihan berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Mengupdate status tagihan berdasarkan ID tagihan.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan pesan sukses.
 */
export const updateTagihanStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const tagihan = await Tagihan.findByPk(req.params.id);
    if (!tagihan) return res.status(404).json({ msg: "Tagihan tidak ditemukan" });

    tagihan.status = status;
    await tagihan.save();

    res.status(200).json({ msg: "Status tagihan berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Menghapus tagihan berdasarkan ID tagihan.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan pesan sukses.
 */
export const deleteTagihan = async (req, res) => {
  try {
    const tagihan = await Tagihan.findByPk(req.params.id);
    if (!tagihan) return res.status(404).json({ msg: "Tagihan tidak ditemukan" });

    await tagihan.destroy();
    res.status(200).json({ msg: "Tagihan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
