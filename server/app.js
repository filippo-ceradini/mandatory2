import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import crypto from 'crypto';


const app = express();
app.use(express.json()); //used to utilize json parsing

//Implementing Session
dotenv.config();
app.use(session({
    secret: crypto.randomBytes(20).toString('hex'), // generate a random secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } //'secure : true' expect us to use https
}));

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: 'http://localhost:8080'
}));


//Implementing Rate Limiter
import rateLimit from "express-rate-limit"
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

import mailRouter from './routers/mailRouter.js'
app.use(mailRouter)

import userLogin from './routers/logRoute.js'
app.use(userLogin)


import signup from './routers/signupRoute.js'
app.use(signup)


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
