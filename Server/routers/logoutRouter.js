import { Router } from "express";
import bcrypt from "bcrypt";
import db from "../databases/connection.js";

const router = Router();


router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.clearCookie('session-id'); // clear the session cookie
            res.send({ message: 'Logged out successfully' });
        }
    });
});

export default router;