import { rateLimit } from 'express-rate-limit';

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false
});
