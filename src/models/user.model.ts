import { getDatabase, dbRun, dbGet } from "../db/connection";
import bcrypt from "bcrypt";

export interface User {
  id?: number;
  email: string;
  username: string;
  password: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
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
  const hashedPassword = await hashPassword(user.password);
  const result = await dbRun(
    database,
    "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
    [user.email, user.username, hashedPassword]
  );

  return {
    id: result.lastID as number,
    email: user.email,
    username: user.username,
    password: hashedPassword,
  } as User;
}
