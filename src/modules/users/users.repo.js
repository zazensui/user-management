import pool from "../../db/pool.js";

export const findUserByEmail = async (email, client = null) => {
  try {
    const queryClient = client || pool;
    const query = `
        SELECT * FROM users
        WHERE email_address = $1`;
    const result = await queryClient.query(query, [email]);

    if (result.rows.length === 0) {
      return null
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (
  username,
  password,
  email,
  client = null
) => {
  try {
    const queryClient = client || pool;
    const query = `
        INSERT INTO users
        (username, password, email_address)
        VALUES ($1, $2, $3)
        RETURNING *`;
    const result = await queryClient.query(query, [username, password, email]);
    return result;
  } catch (error) {
    throw error;
  }
};

export const listUsers = async (offset, pageSize, client = null) => {
  const queryClient = client || pool;
  const query = `
        SELECT * FROM users
        ORDER BY id
         OFFSET $1 LIMIT $2`;
  const result = await queryClient.query(query, [offset, pageSize]);
  return result;
};

export const sendVerificationEmail = async (
  user_id,
  token_hash,
  expiry,
  purpose,
  client = null
) => {
  const queryClient = client || pool;
  const query = `
        INSERT INTO email_verifications (user_id, token_hash, expiry, purpose)
        VALUES ($1, $2, $3, $4)`;
  const result = await queryClient.query(query, [
    user_id,
    token_hash,
    expiry,
    purpose,
  ]);
  return result;
};
