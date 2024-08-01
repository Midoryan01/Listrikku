import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

/**
 * Model untuk tabel 'tarif'.
 * @typedef {Object} Tarif
 * @property {number} id_tarif - Primary key, auto increment.
 * @property {number} daya - Daya listrik dalam satuan watt, tidak boleh null.
 * @property {number} tarifperkwh - Tarif per kWh dalam satuan rupiah, tidak boleh null.
 */

const Tarif = db.define('Tarif', {
    id_tarif: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    daya: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tarifperkwh: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'tarif',
    timestamps: false,
});

export default Tarif;
