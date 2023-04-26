import { Router } from "express";
import bcrypt from "bcrypt";
import db from "../databases/connection.js";

const router = Router();

export let hashedPassword = ""

router.post("/new-user", async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all required credentials' });
    }

    const user = await db.get(`SELECT * FROM users WHERE email = ?` , [email]);
    if (user) {
        if (user.email === email) return res.status(400).json({ message: `User with the email '${email}' already exists` });
    }
    hashedPassword = await bcrypt.hash(password, 12);
    const { lastID } = await db.run(`INSERT INTO users (email, password) VALUES (?, ?);`, [email, hashedPassword]);

    return res.status(200).json({
        message: `User created successfully`
    });
});

export default router;