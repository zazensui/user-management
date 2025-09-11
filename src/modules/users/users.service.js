import { listUsers as listUsersRepo } from "./users.repo.js";

export const listUsers = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    
    const users = await listUsersRepo(offset, pageSize);

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
    }
  } catch (err) {
        console.error("Error in listUsers service:", err)
        return {
            status: 500,
            message: "Internal server error"
        }
  }
};
