import {rateLimit} from "express-rate-limit"

export const adminLimiter = rateLimit({
    windowMs: 1000, //1 second
    limit: 1,
    standardHeaders: true,
    legacyHeaders: true,
    message: "Rate limit exceeded"
})