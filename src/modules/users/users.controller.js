import * as userService from "./users.service.js";

export const findUserByEmail = async (req, res) => {
  const email = req.query.email;
  const result = await userService.findUserByEmail(email);
  res.status(result.status).json(result.data || { message: result.message });
};

export const registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  const result = await userService.registerUser(username, password, email);
  res.status(result.status).json(result.data || { message: result.message });
};

export const verifyUser = async (req, res) => {
  const { user_id, verification_token } = req.query;
  const result = await userService.verifyUser(user_id, verification_token);
  res.status(result.status).json(result.data || { message: result.message });
};

export const resendVerificationEmail = async (req, res) => {
  const email = req.query.email;
  const result = await userService.resendVerificationEmail(email);
  res.status(result.status).json(result.data || { message: result.message });
};

export const listUsers = async (req, res) => {
  const page = parseInt(req.validated.query.page) || 1;
  const pageSize = parseInt(req.validated.query.page_size) || 10;
  const result = await userService.listUsers(page, pageSize);
  res.status(result.status).json(result.data || { message: result.message });
};
