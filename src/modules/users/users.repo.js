import pool from "../../db/pool.js";

//GET FUNCTIONS
export const findUserByEmail = async (email, client = null) => {
  try {
    const queryClient = client || pool;
    const query = `
        SELECT * FROM users
        WHERE email_address=$1`;
    const result = await queryClient.query(query, [email]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const findUserById = async (user_id, client = null) => {
  try {
    const queryClient = client || pool;
    const query = `
      SELECT * FROM users
      WHERE id=$1`;
    const result = await queryClient.query(query, [user_id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const getEmailVerification = async (user_id, client = null) => {
  //Attempts to get the LATEST email verification for the user
  try {
    const queryClient = client || pool;
    const query = `
    SELECT * FROM email_verifications
    WHERE user_id=$1
    ORDER BY expiry DESC
    LIMIT 1`;
    const result = await queryClient.query(query, [user_id]);
  
    if (result.rows.length === 0) {
      return null;
    }


    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

//POST FUNCTIONS
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

//PUT FUNCTIONS
export const verifyEmail = async (user_id, client = null) => {
  try {
    const queryClient = client || pool;
    const query = `
    UPDATE users 
    SET is_verified=true 
    WHERE id=$1`;
    const result = await queryClient.query(query, [user_id]);
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};

//ADMIN FUNCTIONS
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
  try {
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
  } catch (error) {
    throw error;
  }
};
