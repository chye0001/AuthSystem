import 'dotenv/config'


import express from 'express';
const app = express();
app.use(express.json());


import helmet from 'helmet'
app.use(helmet());


import { rateLimit } from 'express-rate-limit'
const generalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 300, // Limit each IP to 300 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
}) 
app.use(generalLimiter)

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false
})
app.use("/auth", authLimiter);


import session from 'express-session';
app.use(session({
    secret: process.env.SESSION_SECRET, // have this secret in a .env file
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  //false beacause we use http in dev, but has to be true in production because it uses https
}))


import cors from 'cors';
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


import authRouter from './authRouter/authRouter.js';
app.use(authRouter);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {console.log("Server is running on port:", PORT)});