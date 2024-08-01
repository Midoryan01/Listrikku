import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Penggunaan from './Penggunaan.js';
import Pelanggan from './Pelanggan.js';

const { DataTypes } = Sequelize;

/**
 * Model untuk tabel 'tagihan'.
 * @typedef {Object} Tagihan
 * @property {number} id_tagihan - Primary key, auto increment.
 * @property {number} id_penggunaan - Foreign key, merujuk ke 'id_penggunaan' di tabel 'penggunaan'.
 * @property {number} id_pelanggan - Foreign key, merujuk ke 'id_pelanggan' di tabel 'pelanggan'.
 * @property {string} bulan - Bulan tagihan, tidak boleh null.
 * @property {number} tahun - Tahun tagihan, tidak boleh null.
 * @property {number} jumlah_meter - Jumlah meter yang digunakan, tidak boleh null.
 * @property {('Lunas'|'Belum Lunas')} status - Status tagihan, tidak boleh null.
 */

const Tagihan = db.define('tagihan', {
    id_tagihan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_penggunaan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Penggunaan,
            key: 'id_penggunaan'
        }
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
    jumlah_meter: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Lunas', 'Belum Lunas'),
        allowNull: false
    }
}, {
    tableName: 'tagihan',
    timestamps: false
});



export default Tagihan;
