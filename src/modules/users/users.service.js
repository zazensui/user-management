import crypto from "crypto";

import * as usersRepository from "./users.repo.js";
import { sendVerificationEmail } from "../emails/mail_service.js";
import { withTransaction } from "../../db/transaction.js";

export const findUserByEmail = async (email) => {
  try {
    const result = await usersRepository.findUserByEmail(email);
    if (!result) {
      return {
        status: 404,
        message: "User not found",
      };
    }
    return {
      status: 200,
      message: "User info fetched successfully",
      data: {
        data: result,
        meta: {},
      },
    };
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
    //Generate the random token and the hash for email verification
    const random_token = crypto.randomInt(100000, 999999).toString();
    const token_hash = crypto
      .createHash("sha256")
      .update(random_token)
      .digest("hex");
    const token_expiry = new Date(Date.now() + 3600000);

    //Here we are committing 2 db queries within one transaction so if either one fails, the entire transaction is reverted
    const result = await withTransaction(async (client) => {
      const register_result = await usersRepository.registerUser(
        username,
        password,
        email,
        client
      );

      const newUser = register_result.rows[0];

      await usersRepository.sendVerificationEmail(
        newUser.id,
        token_hash,
        token_expiry,
        "email_verification",
        client
      );

      return { user: newUser };
    });

    try {
      await sendVerificationEmail(
        result.user.email_address,
        result.user.id,
        result.user.username,
        random_token
      );
    } catch (error) {
      console.error("Email verification sending failed: ", error);
    }

    return {
      status: 201,
      message: "Registered the new user successfully",
      data: {
        user_id: result.user.id,
        email: result.user.email_address,
        username: result.user.username,
      },
      meta: {},
    }; //DO NOT RETURN THE PASSWORD
  } catch (err) {
    console.error("Error registering user", err);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};

export const verifyUser = async (user_id, verification_token) => {
  try {
    //Check if user is already verified
    const user = await usersRepository.findUserById(user_id);
    if (!user) {
      return {
        status: 404,
        message: "User not found",
      };
    }

    if (user.is_verified == true) {
      return {
        status: 403,
        message: "Email is already verified",
      };
    }

    //Get the latest email verification of the user
    const email_verification = await usersRepository.getEmailVerification(
      user_id
    );
    if (!email_verification) {
      return {
        status: 404,
        message: "No email verifications found",
      };
    }

    if (email_verification.expiry < new Date()) {
      return {
        status: 403,
        message: "Verification token is already expired",
      };
    }

    const token_hash = crypto
      .createHash("sha256")
      .update(verification_token)
      .digest("hex");
    if (email_verification.token_hash !== token_hash) {
      return {
        status: 400,
        message: "Invalid token",
      };
    } else if (email_verification.token_hash === token_hash) {
      await usersRepository.verifyEmail(user_id);
      return {
        status: 200,
        message: "Email verified successfully",
      };
    }
  } catch (error) {
    console.error("Error in verifying user email", error);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};

export const resendVerificationEmail = async (email) => {
  const random_token = crypto.randomInt(100000, 999999).toString();
  const token_hash = crypto
    .createHash("sha256")
    .update(random_token)
    .digest("hex");
  const token_expiry = new Date(Date.now() + 3600000);

  try {
    const user = await usersRepository.findUserByEmail(email);
    if (!user) {
      return {
        status: 404,
        message: "User not found",
      };
    }

    if (user.is_verified == true) {
      return {
        status: 403,
        message: "Email is already verified",
      };
    }

    await usersRepository.sendVerificationEmail(
      user.id,
      token_hash,
      token_expiry,
      "email_verification"
    );

    try {
      await sendVerificationEmail(
        user.email_address,
        user.id,
        user.username,
        random_token
      );
    } catch (error) {
      console.error("Email verification sending failed: ", error);
    }

    return {
      status: 200,
      message: `Verification code sent to ${email}`
    }
  } catch (error) {
    console.error("Error in verifying user email", error);
    return {
      status: 500,
      message: "Internal server error",
    };
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
