import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Tarif from './Tarif.js';

const { DataTypes } = Sequelize;

/**
 * Model untuk tabel 'pelanggan'.
 * @typedef {Object} Pelanggan
 * @property {number} id_pelanggan - Primary key, auto increment.
 * @property {string} username - Username pelanggan, tidak boleh null.
 * @property {string} password - Password pelanggan, tidak boleh null.
 * @property {string} nomor_kwh - Nomor KWH pelanggan, harus berupa angka.
 * @property {string} nama_pelanggan - Nama pelanggan, tidak boleh null.
 * @property {string} alamat - Alamat pelanggan, tidak boleh null.
 * @property {number} id_tarif - Foreign key, merujuk ke 'id_tarif' di tabel 'tarif'.
 */
const Pelanggan = db.define('pelanggan', {
  id_pelanggan: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(16),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  nomor_kwh: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^[0-9]+$/,
        msg: "Nomor KWH harus berupa angka"
      }
    }
  },
  nama_pelanggan: {
    type: DataTypes.STRING(32),
    allowNull: false
  },
  alamat: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  id_tarif: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Tarif,
      key: 'id_tarif'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true,
});

export default Pelanggan;
