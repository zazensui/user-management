import * as usersRepository from "./users.repo.js";

export const findUserByEmail = async (email) => {
  try {
    const result = await usersRepository.findUserByEmail(email);
    if (result.rows.length === 0) {
      return {
        status: 404,
        message: "User not found"
      }
    }
    return {
      status: 200,
      message: "User info fetched successfully",
      data: {
        data: result.rows,
        meta: {}
      },
    }
  } catch (err) {
    console.error("Error finding user by email", err);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};

export const registerUser = async (username, password, email) => {
  try {
    const result = await usersRepository.registerUser(
      username,
      password,
      email
    );
    if (result.rows.length === 0) {
      return res.status(400).send("User registration failed");
    }
    const random_token = crypto.randomInt(100000, 999999).toString();
    const token_hash = crypto
      .createHash("sha256")
      .update(random_token)
      .digest("hex");
    await pool.query(
      "INSERT INTO email_verifications (user_id, token_hash, expiry, purpose) VALUES ($1, $2, $3, $4)",
      [
        result.rows[0].id,
        token_hash,
        new Date(Date.now() + 3600000),
        "email_verification",
      ]
    );
    await sendVerificationEmail(
      email,
      result.rows[0].id,
      username,
      random_token
    );
    res.status(201).json(result.rows[0]); //DO NOT RETURN THE PASSWORD
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Internal Server Error");
  }
};

export const listUsers = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;

    const users = await usersRepository.listUsers(offset, pageSize);

    return {
      status: 200,
      message: "OK",
      data: {
        data: users.rows,
        meta: {
          page: page,
          page_size: pageSize,
        },
      },
    };
  } catch (err) {
    console.error("Error in listUsers service:", err);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};
