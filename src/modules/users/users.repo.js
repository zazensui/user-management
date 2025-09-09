import pool from '../../db/pool.js'

export const listUsers = async (offset, pageSize) => {
    const query = `
        SELECT * FROM users
        ORDER BY id
         OFFSET $1 LIMIT $2`
    const result = await pool.query(query, [offset, pageSize])
    return result
}
