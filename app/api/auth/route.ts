import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../db";
import { UserType } from "../type";

export const register = async (req: Request, res: Response) => {
  try {
    const {
      first_name,
      last_name,
      phone,
      email,
      password,
      date_of_birth,
      gender,
    } = req.body;

    const params = [
      first_name,
      last_name,
      phone,
      email,
      password,
      date_of_birth,
      gender,
    ];

    // check exist email
    const query_check_email = "SELECT * FROM users WHERE email = $1";
    const params_check_email = [email];
    const users: UserType[] = await db.query(
      query_check_email,
      params_check_email
    );
    const user = users[0];

    if (user) {
      return res.status(409).json({ error: "E-mail was used" });
    }

    const query = `INSERT INTO users(first_name, last_name, phone, email, password, date_of_birth, gender)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`;

    const registerUser: UserType[] = await db.query(query, params);

    res.status(201).json(registerUser[0]);
  } catch (err) {
    console.error("Create user error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const query = "SELECT * FROM users WHERE email = $1";
    const params = [email];
    const users: UserType[] = await db.query(query, params);
    const user = users[0];

    if (!user) {
      return res.status(404).json({ messeage: "User does not exist." });
    }

    if (user.password === password && process.env.JWT_SECRET) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET
      );
      return res.status(200).json(token);
    } else {
      return res.status(400).json({ messeage: "Invalid password." });
    }
  } catch (err) {
    console.error("Log in error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
