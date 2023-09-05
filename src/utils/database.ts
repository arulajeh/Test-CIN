import { Sequelize } from "sequelize";

export const sequelize: Sequelize = new Sequelize(`${process.env.SQL_DATABASE}`, `${process.env.SQL_USERNAME}`, `${process.env.SQL_PASSWORD}`, {
  host: `${process.env.SQL_HOST}`,
  dialect: "postgres",
  timezone: "+07:00",
  logging: false,
  pool: {
    acquire: 60000,
    idle: 30000,
    max: 100,
    min: 0
  }
});