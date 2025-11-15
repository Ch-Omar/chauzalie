import mysql from "mysql2/promise";

let connection;
export const createConnection = async () => {
  if (!connection) {
    const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } = process.env;
    for (const [k, v] of Object.entries({ DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME })) {
      if (!v) throw new Error(`Missing required env: ${k}`);
    }
    connection = await mysql.createConnection({
      host: DATABASE_HOST,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
    });
  }
  return connection;
};
