import pool from '../../db/pool.js'

export const listUsers = async (offset, pageSize) => {
    const query = `
        SELECT * FROM users
        ORDER BY id
        LIMIT $1 OFFSET $2`
    const result = await pool.query(query, [pageSize, offset])
    return result
}
