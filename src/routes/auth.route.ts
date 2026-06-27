import { Router } from "express";
import path from "path";
import {
  createUser,
  findUserByEmail,
  findUserByUsername,
} from "../models/user.model";

const router = Router();

router.get("/signin", (_req, res) => {
  res.sendFile(
    path.join(process.cwd(), "public", "pages", "auth", "signin.html")
  );
});

router.get("/signup", (_req, res) => {
  res.sendFile(
    path.join(process.cwd(), "public", "pages", "auth", "signup.html")
  );
});

router.post("/signup", async (req, res) => {
  const { email, username, password, repeatPassword } = req.body;

  if (!email || !username || !password || !repeatPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (
    typeof email !== "string" ||
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof repeatPassword !== "string"
  ) {
    return res.status(400).json({ message: "Invalid input types." });
  }

  if (password !== repeatPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  const emailTrimmed = email.trim().toLowerCase();
  const usernameTrimmed = username.trim();
  const passwordTrimmed = password.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailTrimmed)) {
    return res.status(400).json({ message: "Email address is not valid." });
  }

  if (usernameTrimmed.length < 3) {
    return res.status(400).json({ message: "Username must be at least 3 characters." });
  }

  if (passwordTrimmed.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters." });
  }

  try {
    const existingEmail = await findUserByEmail(emailTrimmed);
    if (existingEmail) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const existingUsername = await findUserByUsername(usernameTrimmed);
    if (existingUsername) {
      return res.status(409).json({ message: "Username already in use." });
    }

    const user = await createUser({
      email: emailTrimmed,
      username: usernameTrimmed,
      password: passwordTrimmed,
    });

    return res.status(201).json({
      message: "Signup successful.",
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (error) {
    console.error("Signup error", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

export default router;