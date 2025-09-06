import express from 'express'
import dotenv from 'dotenv'
import {users} from './modules/users/users.routes.js'


dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use('/users', users)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})