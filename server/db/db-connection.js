import pkg from "pg";
const { Pool } = pkg;

const db = new Pool({
  connectionString: process.env.DB_URL,

  // What does the botton meanå
  // ssl: process.env.DATABASE_SSL !== "false" && {
  //   rejectUnauthorized: false,
  // },
});

export default db;
