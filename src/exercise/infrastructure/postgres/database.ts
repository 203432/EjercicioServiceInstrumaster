import { config } from "dotenv";
import { Pool } from "pg";
config();

const port = parseInt(process.env.DBPORT || "5432", 10);
export const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE,
  port: port,
});
