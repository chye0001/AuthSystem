import 'dotenv/config'

import session from 'express-session';
export const sessionConfiguration = session({
    secret: process.env.SESSION_SECRET, // have this secret in a .env file
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  //false beacause we use http in dev, but has to be true in production because it uses https
});
