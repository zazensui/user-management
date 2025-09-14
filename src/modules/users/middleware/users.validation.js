import { findUserByEmail } from "../users.service.js"

export const checkEmailExists = async (req, res, next) => {
  try {
    const email = req.body.email;
    const existingUser = await findUserByEmail(email);
    if (existingUser.status === 200) {
      console.log("Email already exists");
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    console.log(`Email is available: `, email);
    next();
  } catch (error) {
    next(error);
  }
};
