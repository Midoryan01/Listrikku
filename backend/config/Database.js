import { Sequelize } from "sequelize";

/**
 * Membuat instance Sequelize yang terkoneksi ke database MySQL.
 * @constant {Sequelize} db - Instance Sequelize yang dikonfigurasi untuk terhubung ke database .
 */
const db = new Sequelize('listrikku', 'root', '', {
    host: "localhost",
    dialect: "mysql"
    });

    async function testConnection() {
      try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    }
    
    testConnection();
    
export default db;
