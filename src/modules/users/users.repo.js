import pool from '../../db/pool.js'

export const findUserByEmail = async (email) => {
    const query = `
        SELECT * FROM users
        WHERE email_address = $1`
    const result = await pool.query(query, [email])
    return result

}

export const registerUser = async (username, password, email) => {
    const query = (`
        INSERT INTO users
        (username, password, email_address)
        VALUES ($1, $2, $3)
        RETURNING *`
        [username, password, email])
    const result = await pool.query(query, [username, password, email])
    return result
}

export const listUsers = async (offset, pageSize) => {
    const query = `
        SELECT * FROM users
        ORDER BY id
         OFFSET $1 LIMIT $2`
    const result = await pool.query(query, [offset, pageSize])
    return result
}
