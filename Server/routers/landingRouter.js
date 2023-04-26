import { Router } from "express";
import { isAuthenticated } from "../app.js";

const router = Router();

router.get("/", isAuthenticated, (req, res, next) => {
    res.send({ message: `Hi ${req.session.user.username}, Welcome to the home page` });
})

export default router;