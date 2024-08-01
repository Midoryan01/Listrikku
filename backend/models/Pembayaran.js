import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Tagihan from "./Tagihan.js";
import Pelanggan from "./Pelanggan.js";
import User from "./User.js";

const { DataTypes } = Sequelize;

/**
 * Model untuk tabel 'pembayaran'.
 * @typedef {Object} Pembayaran
 * @property {number} id_pembayaran - Primary key, auto increment.
 * @property {number} id_tagihan - Foreign key, merujuk ke 'id_tagihan' di tabel 'tagihan'.
 * @property {number} id_pelanggan - Foreign key, merujuk ke 'id_pelanggan' di tabel 'pelanggan'.
 * @property {Date} tanggal_pembayaran - Tanggal pembayaran, tidak boleh null.
 * @property {string} bulan_bayar - Bulan pembayaran, tidak boleh null.
 * @property {number} biaya_admin - Biaya admin, tidak boleh null.
 * @property {number} total_bayar - Total bayar, tidak boleh null.
 * @property {number} id_user - Foreign key, merujuk ke 'id_user' di tabel 'user'.
 */
const Pembayaran = db.define(
  "pembayaran",
  {
    id_pembayaran: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_tagihan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tagihan,
        key: "id_tagihan",
      },
    },
    id_pelanggan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pelanggan,
        key: "id_pelanggan",
      },
    },
    tanggal_pembayaran: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    bulan_bayar: {
      type: DataTypes.STRING(16),
      allowNull: true,
    },
    biaya_admin: {
      type: DataTypes.INTEGER,
      defaultValue: 2500,
    },
    total_bayar: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id_user",
      },
    },
  },
  {
    tableName: "pembayaran",
    timestamps: false,
  }
);

export default Pembayaran;
