const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client
  .connect()
  .then(() => console.log("connected"))
  .catch((err) => console.error("connection error:", err));

module.exports = client;
