import express from "express";
import dotenv from "dotenv";

import * as userSchemas from "./users.schema.js";
import * as userController from "./users.controller.js";
import * as validation from "../../middleware/validation.js";
import * as rateLimiter from "../../middleware/rate_limit.js";
import * as userValidation from "../users/middleware/users.validation.js"

dotenv.config();

const router = express.Router();
router.use(express.json());

router.get(
  "/email",
  validation.validateQuery(userSchemas.findUserByEmailSchema),
  userController.findUserByEmail
);

router.post(
  "/register",
  validation.validateBody(userSchemas.registerUserSchema),
  userValidation.checkEmailExists,
  userController.registerUser
);



router.get(
  "/list",
  rateLimiter.adminLimiter,
  validation.validateQuery(userSchemas.listUsersSchema),
  userController.listUsers
);
//TODO: Authentication & Authorization middleware

// router.put('/:id', async (req, res) => {
//     const { id } = req.params
//     const { username, password, email_address } = req.body
//     try {
//         const result = await pool.query('UPDATE users SET username = $1, password = $2, email_address = $3 WHERE id = $4 RETURNING *', [username, password, email_address, id])
//         if (result.rows.length === 0) {
//             return res.status(404).send('User not found')
//         }
//         res.status(200).json(result.rows[0])
//     } catch (err) {
//         console.error('Error executing query', err)
//         res.status(500).send('Internal Server Error')
//     }
// })

// router.get('/:id', async (req, res) => {
//     const {id} = req.params
//     try {
//         const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])
//         if (result.rows.length === 0) {
//             return res.status(404).send('User not found')
//         }
//         res.status(200).json(result.rows[0])
//     } catch (err) {
//         console.error('Error executing query', err)
//         res.status(500).send('Internal Server Error')
//     }
// })

// router.delete('/:id', async (req, res) => {
//     const {id} = req.params
//     try {
//         await pool.query('DELETE FROM users WHERE id = $1', [id])
//         res.status(204).send()
//     } catch (err) {
//         console.error('Error executing query', err)
//         res.status(500).send('Internal Server Error')
//     }
// })

// router.get('/verify-user', async (req, res) => {
//     const {id, token} = req.query
//     try {
//         const user_data = await pool.query('SELECT * FROM users WHERE id = $1', [id])
//         if (user_data.rows[0].is_verified === true) {
//             res.status(400).send('User already verified')
//         }else{
//             const email_verification = await pool.query('SELECT * FROM email_verifications WHERE user_id = $1', [id])
//             const token_hash = crypto.createHash('sha256').update(token).digest('hex')
//             if (email_verification.rows.length === 0) {
//                 res.status(404).send('Email verification not found')
//             } else if (email_verification.rows[0].purpose !== 'email_verification') {
//                 res.status(400).send('Token purpose is not for email verification')
//             } else if (email_verification.rows[0].expiry < new Date()) {
//                 await pool.query('DELETE FROM email_verifications where user_id = $1', [id])
//                 res.status(400).send('Token expired')
//             } else if (email_verification.rows[0].token_hash !== token_hash) {
//                 await pool.query('DELETE FROM email_verifications where user_id = $1', [id])
//                 res.status(400).send('Invalid token')
//             } else if (email_verification.rows[0].token_hash === token_hash) {
//                 await pool.query('UPDATE users SET is_verified = $1 WHERE id = $2', [true, id])
//                 await pool.query('DELETE FROM email_verifications WHERE user_id = $1', [id])
//                 res.status(200).send('User verified successfully')
//             }
//         }
//     } catch (err) {
//         console.error('Error executing query', err)
//         res.status(500).send('Internal Server Error')
//     }
// })

export { router as users };
