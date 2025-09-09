import { listUsers as listUsersRepo } from "./users.repo.js";

export const listUsers = async (page, pageSize) => {
  try {
    if (page < 1 || pageSize < 10 || pageSize > 1000) {
      return {
        status: 400,
        message: "Invalid query parameters",
        errors: [
          {
            field: "page",
            message: "Page must be ≥ 1",
          },
          {
            field: "page_size",
            message: "Page size must be between 10 and 1000",
          },
        ],
      };
    }

    const offset = (page - 1) * pageSize;
    const users = await listUsersRepo(offset, pageSize);
    console.log(users)

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
