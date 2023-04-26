import { Router } from "express";
import bcrypt from "bcrypt";
import isAuthenticated from '../app.js';
import db from "../databases/connection.js";

const router = Router();

router.get("/", isAuthenticated, (req, res, next) => {
    res.send({ message: `Hi ${req.session.user.email}, Welcome to the home page` });
})

router.post("/login", async (req, res, next) => {
    const { email, password, } = req.body;

    // Validate the required fields
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all required credentials' });
    }

    //Check if user exists
    const userFound = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (userFound) {

        if (email != userFound.email) return res.status(404).json({ message: `Couldn't find user with email '${email}'` });

        //Check if password is the same
        const isSamePassword = await bcrypt.compare(password, userFound.password);
        console.log(password + " " + userFound.password)
        if (isSamePassword) {
            //save the user info in the session
            req.session.user = {
                id: userFound.id,
                email: userFound.email
            };
            console.log(req.session.user.email)
            return res.status(200).json({ message: "Logged in " + userFound.email});

        } else {
            return res.status(400).json({ message: "Wrong password. Try again" });
        }
    } else {
        return res.status(404).json({ message: "User Not found" });
    }
})

router.get("/user", isAuthenticated, (req, res) => {
    const { email } = req.session.user;
    res.json({ email });
});

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

router.get('/test-session', (req, res) => {
    res.json({ session: req.session });
});


export default router;
