import {rateLimit} from "express-rate-limit"

export const adminLimiter = rateLimit({
    windowMs: 1000, //1 second
    limit: 1,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Rate limit exceeded"
})

export const registrationLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many registration attempts, please try again in after a minute."
})