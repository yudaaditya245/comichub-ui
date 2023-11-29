// import { Sequelize } from 'sequelize';
const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2");

// export const sequelize = new Sequelize('mysql://root@localhost:3306/dev_comichub')
const sequelize = new Sequelize(process.env.DB_DB, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  dialectModule: mysql2
});

module.exports = { sequelize };

// async function con() {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//     console.log({
//       db: process.env.DB_DB,
//       user: process.env.DB_USER,
//       pw: process.env.DB_PASS,
//       host: process.env.DB_HOST
//     });
//   }
// }

// con();
