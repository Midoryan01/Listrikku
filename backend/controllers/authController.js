import Pelanggan from "../models/Pelanggan.js";
import User from "../models/User.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

/**
 * Login function to authenticate a user or customer.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with user/customer data and token.
 */
export const Login = async (req, res) => {
  const { username, password } = req.body; // Get username and password from request body

  try {
    let userOrCustomer = await Pelanggan.findOne({ where: { username } });

    // Check if user is not found in Pelanggan
    if (!userOrCustomer) {
      userOrCustomer = await User.findOne({ where: { username } });
    }

    // If still not found, return error
    if (!userOrCustomer) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    // Verify password using argon2
    const isPasswordMatch = await argon2.verify(userOrCustomer.password, password);
    if (!isPasswordMatch) {
      return res.status(400).json({ msg: "Password Salah" });
    }

    // Determine if the user or customer and create payload
    const isUser = Boolean(userOrCustomer.id_user); // True if user

    const payload = isUser
      ? {
          id_user: userOrCustomer.id_user,
          username: userOrCustomer.username,
          id_level: userOrCustomer.id_level,
          role: 'admin'
        }
      : {
          id_pelanggan: userOrCustomer.id_pelanggan,
          username: userOrCustomer.username,
          nomor_kwh: userOrCustomer.nomor_kwh,
          nama_pelanggan: userOrCustomer.nama_pelanggan,
          alamat: userOrCustomer.alamat,
          id_tarif: userOrCustomer.id_tarif,
          role: 'pelanggan'
        };

    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send response with token and user/customer data
    return res.status(200).json({
      token,
      ...payload,
    });
  } catch (error) {
    // Log error for debugging and send a generic error message
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

/**
 * Function to get the currently logged-in user or customer data.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with user/customer data.
 */
export const Me = async (req, res) => {
  const userId = req.user.id_user; // Get user ID from the request
  const pelangganId = req.user.id_pelanggan; // Get customer ID from the request

  try {
    if (userId) {
      // User data request
      const user = await User.findByPk(userId, {
        attributes: ["id_user", "username", "nama_admin", "id_level"],
      });
      if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
      return res.status(200).json(user);
    } else if (pelangganId) {
      // Customer data request
      const pelanggan = await Pelanggan.findByPk(pelangganId, {
        attributes: [
          "id_pelanggan",
          "username",
          "nomor_kwh",
          "nama_pelanggan",
          "alamat",
          "id_tarif",
        ],
      });
      if (!pelanggan) return res.status(404).json({ msg: "Pelanggan tidak ditemukan" });
      return res.status(200).json(pelanggan);
    } else {
      return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Function to log out the user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with logout message.
 */
export const LogOut = (req, res) => {
  res.status(200).json({ msg: "Anda telah logout" }); // Return logout message
};