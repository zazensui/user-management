import * as userService from './users.service.js'

export const listUsers = async (req, res) => {
    const page = parseInt(req.validated.query.page) || 1
    const pageSize = parseInt(req.validated.query.page_size) || 10
    const result = await userService.listUsers(page, pageSize)
    res.status(result.status).json(result.data || {message: result.message})
}

export const registerUser = async(req, res) => {
    const { username, password, email } = req.body
    try {
        const result = await pool.query('INSERT INTO users (username, password, email_address) VALUES ($1, $2, $3) RETURNING *', [username, password, email])
        if (result.rows.length === 0) {
            return res.status(400).send('User registration failed')
        }
        const random_token = crypto.randomInt(100000, 999999).toString()
        const token_hash = crypto.createHash('sha256').update(random_token).digest('hex')
        await pool.query('INSERT INTO email_verifications (user_id, token_hash, expiry, purpose) VALUES ($1, $2, $3, $4)', [result.rows[0].id, token_hash, new Date(Date.now() + 3600000), 'email_verification'])
        await sendVerificationEmail(email, result.rows[0].id, username, random_token)
        res.status(201).json(result.rows[0]) //DO NOT RETURN THE PASSWORD
    } catch (err) {
        console.error('Error executing query', err)
        res.status(500).send('Internal Server Error')
    }
}

