import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Level from "./Level.js";


const { DataTypes } = Sequelize;

/**
 * Model untuk tabel 'user'.
 * @typedef {Object} User
 * @property {number} id_user - Primary key, auto increment.
 * @property {string} username - Nama pengguna, tidak boleh null.
 * @property {string} password - Kata sandi, tidak boleh null dan tidak boleh kosong.
 * @property {string} nama_admin - Nama admin, tidak boleh null.
 * @property {number} id_level - ID level pengguna, tidak boleh null, referensi ke tabel 'level'.
 */

const User = db.define(
  "user",
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama_admin: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    id_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Level,
        key: "id_level",
      },
    },
  },
  {
    timestamps: false,       
    freezeTableName: true
  }
);

export default User;
