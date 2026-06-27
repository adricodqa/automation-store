import { getDatabase, dbRun, dbGet } from "../db/connection";

export interface User {
  id?: number;
  email: string;
  username: string;
  password: string;
}

export async function findUserByEmail(email: string) {
  const database = await getDatabase();
  return dbGet<User>(database, "SELECT * FROM users WHERE email = ?", [email]);
}

export async function findUserByUsername(username: string) {
  const database = await getDatabase();
  return dbGet<User>(database, "SELECT * FROM users WHERE username = ?", [username]);
}

export async function createUser(user: User) {
  const database = await getDatabase();
  const result = await dbRun(
    database,
    "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
    [user.email, user.username, user.password]
  );

  return {
    id: result.lastID as number,
    ...user,
  } as User;
}
