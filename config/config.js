const PORT = process.env.PORT || 3000;
const SEED = process.env.SEED || "seed-desarrollo";
const TIME_TOKEN = process.env.TIME_TOKEN || 60 * 60 * 24 * 30;
const DATABASE = process.env.DATABASE || "bookstore-api";
const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_URL = process.env.DB_URL || "127.0.0.1";
const DB_PORT = process.env.DB_PORT || 27017;

module.exports = {
  PORT,
  SEED,
  TIME_TOKEN,
  DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  DB_URL,
  DB_PORT,
};
