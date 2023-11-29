// import { Sequelize } from 'sequelize';
const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2")

// export const sequelize = new Sequelize('mysql://root@localhost:3306/dev_comichub')
const sequelize = new Sequelize("dev_comichub", "root", "", {
  host: "localhost",
  dialect: "mysql",
  dialectModule: mysql2,
});

module.exports = { sequelize };

// async function con() {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// }

// con();
