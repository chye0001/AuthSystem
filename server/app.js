import 'dotenv/config'


import express from 'express';
const app = express();
app.use(express.json());


import helmet from 'helmet'
app.use(helmet());


import { generalLimiter } from './middleware/rateLimitter/generalLimiter.js';
app.use(generalLimiter)
import { authLimiter } from './middleware/rateLimitter/authLimiter.js';
app.use("/api/auth/", authLimiter);


import { sessionConfiguration } from './middleware/session.js';
app.use(sessionConfiguration)


import { corsConfiguration } from './middleware/cors.js';
app.use(corsConfiguration);


import authRouter from './router/authRouter.js';
app.use(authRouter);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {console.log("Server is running on port:", PORT)});
