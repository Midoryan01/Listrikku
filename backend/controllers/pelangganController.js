import Pelanggan from "../models/Pelanggan.js";
import argon2 from "argon2";

/**
 * Get all customers.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with all customer data.
 */
export const getPelanggan = async (req, res) => {

  try {
    const response = await Pelanggan.findAll({
      attributes: ['id_pelanggan', 'username', 'nomor_kwh', 'nama_pelanggan', 'alamat', 'id_tarif']
    });
    res.status(200).json(response); 
  } catch (error) {
    console.error("Error executing query:", error.message); // Log error eksekusi
    res.status(500).json({ msg: error.message }); 
  }
}


/**
 * Get a customer by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with customer data.
 */
export const getPelangganById = async (req, res) => {
  try {
    const pelangganId = req.params.id; // Get customer ID from request parameters
    const response = await Pelanggan.findOne({
      attributes: ['id_pelanggan', 'username', 'password', 'nomor_kwh', 'nama_pelanggan', 'alamat', 'id_tarif'],
      where: {
        id_pelanggan: pelangganId
      }
    }); 
    res.status(200).json(response); // Return customer data
  } catch (error) {
    res.status(500).json({ msg: error.message }); // Return error message in case of exception
  }
}

/**
 * Create a new customer.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with success message.
 */
export const createPelanggan = async (req, res) => {
  const { username, password, nomor_kwh, nama_pelanggan, alamat, id_tarif } = req.body;

  // Basic validation
  if (!username || !password || !nomor_kwh || !nama_pelanggan || !alamat || !id_tarif) {
    return res.status(400).json({ msg: "Semua field harus diisi" });
  }

  const nomorKwhPattern = /^[0-9]+$/;
  if (!nomor_kwh.toString().match(nomorKwhPattern)) {
    return res.status(400).json({ msg: "Nomor KWH harus berupa angka" });
  }

  try {
    // Check if username already exists
    const existingPelanggan = await Pelanggan.findOne({ where: { username } });
    if (existingPelanggan) {
      return res.status(400).json({ msg: "Username sudah dipakai" });
    }

    // Create new customer
    await Pelanggan.create({
      username,
      password: await argon2.hash(password), // Hash password
      nomor_kwh,
      nama_pelanggan,
      alamat,
      id_tarif
    });

    // Return success response
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    console.error("Error creating customer:", error); // Log error for debugging
    res.status(500).json({ msg: "Terjadi kesalahan server" });
  }
}

/**
 * Update a customer by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with success message.
 */
export const updatePelanggan = async (req, res) => {
  const pelangganId = req.params.id; 
  const user = await Pelanggan.findOne({
    where: {
      id_pelanggan: pelangganId
    }
  }); 

  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" }); 

  const { username, password, nomor_kwh, nama_pelanggan, alamat, id_tarif } = req.body; 
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password; 
  } else {
    hashPassword = await argon2.hash(password); 
  }
  try {
    await Pelanggan.update({
      username,
      password: hashPassword,
      nomor_kwh,
      nama_pelanggan,
      alamat,
      id_tarif
    }, {
      where: {
        id_pelanggan: pelangganId
      }
    }); 
    res.status(200).json({ msg: "Pelanggan Updated" }); 
  } catch (error) {
    res.status(400).json({ msg: error.message }); 
  }
}

/**
 * Delete a customer by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with success message.
 */
export const deletePelanggan = async (req, res) => {
  const pelangganId = req.params.id; // Get customer ID from request parameters
  const user = await Pelanggan.findOne({
    where: {
      id_pelanggan: pelangganId
    }
  }); // Retrieve customer by ID
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" }); // Check if customer exists
  try {
    await Pelanggan.destroy({
      where: {
        id_pelanggan: pelangganId
      }
    }); // Delete customer
    res.status(200).json({ msg: "User Deleted" }); // Return success message
  } catch (error) {
    res.status(400).json({ msg: error.message }); // Return error message in case of exception
  }
}
