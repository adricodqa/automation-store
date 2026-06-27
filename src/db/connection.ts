import sqlite3 from "sqlite3";
import path from "path";

const dbFile = path.join(process.cwd(), "data", "data.sqlite");
let db: sqlite3.Database | null = null;

export async function getDatabase(): Promise<sqlite3.Database> {
  if (db) return db;

  db = new sqlite3.Database(dbFile);
  await dbRun(
    db,
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );`
  );

  return db;
}

/**
 * Run a SQL statement that modifies data or schema.
 *
 * This wrapper converts sqlite3's callback API into a Promise,
 * allowing async/await usage for INSERT, UPDATE, DELETE, CREATE, etc.
 *
 * The resolved RunResult contains metadata such as lastID and changes.
 */
export function dbRun(database: sqlite3.Database, sql: string, params: any[] = []) {
  return new Promise<sqlite3.RunResult>((resolve, reject) => {
    database.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

/**
 * Run a SQL query that returns a single row.
 *
 * This wrapper converts sqlite3's callback API into a Promise,
 * allowing async/await usage for SELECT queries that expect one row.
 */
export function dbGet<T>(database: sqlite3.Database, sql: string, params: any[] = []) {
  return new Promise<T | undefined>((resolve, reject) => {
    database.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row as T | undefined);
    });
  });
}
