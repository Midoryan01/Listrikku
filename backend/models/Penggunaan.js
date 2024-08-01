import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Pelanggan from './Pelanggan.js';

const { DataTypes } = Sequelize;

/**
 * Model untuk tabel 'penggunaan'.
 * @typedef {Object} Penggunaan
 * @property {number} id_penggunaan - Primary key, auto increment.
 * @property {number} id_pelanggan - Foreign key, merujuk ke 'id_pelanggan' di tabel 'pelanggan'.
 * @property {string} bulan - Bulan penggunaan, tidak boleh null.
 * @property {number} tahun - Tahun penggunaan, tidak boleh null.
 * @property {number} meter_awal - Meter awal penggunaan, tidak boleh null.
 * @property {number} meter_akhir - Meter akhir penggunaan, tidak boleh null.
 */
const Penggunaan = db.define('penggunaan', {
  id_penggunaan: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_pelanggan: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pelanggan,
      key: 'id_pelanggan'
    }
  },
  bulan: {
    type: DataTypes.STRING(16),
    allowNull: false
  },
  tahun: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  meter_awal: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  meter_akhir: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'penggunaan',
  timestamps: false
});

export default Penggunaan;
