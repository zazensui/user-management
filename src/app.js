import express from 'express'
import dotenv from 'dotenv'
import pool from './db/pool.js'
import {users} from './routes/users.js'


dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use('/users', users)

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()')
        console.log('Current time:', result.rows[0])
        res.status(200).json(result.rows[0])
    } catch (err) {
        console.error('Error executing query', err)
        res.status(500).send('Internal Server Error')
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})