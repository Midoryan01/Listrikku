import Tarif from "../models/Tarif.js";

export const getTarif = async (req, res) => {
  try {
    const response = await Tarif.findAll({
      attributes: ["id_tarif", "daya", "tarifperkwh"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateTarif = async (req, res) => {
  const { id_tarif } = req.params;  // Ambil id_tarif dari URL params
  const { daya, tarifperkwh } = req.body;  // Ambil data baru dari body request

  try {
    // Cari entitas tarif berdasarkan id_tarif
    const tarif = await Tarif.findOne({
      where: { id_tarif }
    });

    if (!tarif) {
      return res.status(404).json({ msg: "Tarif tidak ditemukan" });
    }

    // Update tarif dengan data baru
    await Tarif.update(
      { daya, tarifperkwh },
      { where: { id_tarif } }
    );

    res.status(200).json({ msg: "Tarif berhasil diupdate" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createTarif = async (req, res) => {
  const { id_tarif, daya, tarifperkwh } = req.body;
  try {
    await Tarif.create({
      id_tarif,
      daya,
      tarifperkwh,
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteTarif = async (req, res) => {
  const { id_tarif } = req.params; 

  try {
    const tarif = await Tarif.findOne({
      where: { id_tarif }
    });

    if (!tarif) {
      return res.status(404).json({ msg: "Tarif tidak ditemukan" });
    }

    await Tarif.destroy({
      where: { id_tarif }
    });

    res.status(200).json({ msg: "Tarif berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};