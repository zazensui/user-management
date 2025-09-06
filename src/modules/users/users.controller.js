import { listUsers as listUsersService } from './users.service.js'

export const listUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.page_size) || 10

    const result = await listUsersService(page, pageSize)

    // console.log(result)
    res.status(result.status).json(result.data || {message: result.message})
}

