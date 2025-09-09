import * as userService from './users.service.js'

export const listUsers = async (req, res) => {
    const page = parseInt(req.validated.query.page) || 1
    const pageSize = parseInt(req.validated.query.page_size) || 10
    const result = await userService.listUsers(page, pageSize)
    res.status(result.status).json(result.data || {message: result.message})
}

