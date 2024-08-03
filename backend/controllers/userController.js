import User from "../models/User.js";
import argon2 from "argon2";

/**
 * Mendapatkan semua pengguna.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan semua data pengguna.
 */
export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["id_user", "username", "nama_admin", "id_level"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Mendapatkan pengguna berdasarkan ID.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan data pengguna berdasarkan ID.
 */
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await User.findOne({
      attributes: ["id_user", "username", "password", "nama_admin", "id_level"],
      where: {
        id_user: userId,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Membuat pengguna baru.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan pesan sukses.
 */
export const createUser = async (req, res) => {
  const { username, password, nama_admin, id_level } = req.body;
  try {
    await User.create({
      username: username,
      password: await argon2.hash(password),
      nama_admin: nama_admin,
      id_level: id_level,
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

/**
 * Mengupdate pengguna berdasarkan ID.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan pesan sukses.
 */
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({
    where: {
      id_user: userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

  const { username, password, nama_admin, id_level } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }

  try {
    await User.update(
      {
        username: username,
        password: hashPassword,
        nama_admin: nama_admin,
        id_level: id_level,
      },
      {
        where: {
          id_user: userId,
        },
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

/**
 * Menghapus pengguna berdasarkan ID.
 * @param {Object} req - Objek permintaan Express.
 * @param {Object} res - Objek respons Express.
 * @returns {Object} JSON dengan pesan sukses.
 */
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({
    where: {
      id_user: userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  try {
    await User.destroy({
      where: {
        id_user: userId,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
