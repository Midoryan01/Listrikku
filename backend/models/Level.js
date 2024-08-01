import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

/**
 * Model untuk tabel 'level'.
 * @typedef {Object} Level
 * @property {number} id_level - Primary key, auto increment.
 * @property {string} nama_level - Nama level, tidak boleh null.
 */
const Level = db.define('Level', {
  id_level: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama_level: {
    type: DataTypes.STRING(16),
    allowNull: false,
  },
}, {
  tableName: 'level',
  timestamps: false,
});

export default Level;
