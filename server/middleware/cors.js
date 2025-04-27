import cors from 'cors';

export const corsConfiguration = cors({
    origin: "http://localhost:5173",
    credentials: true
})
