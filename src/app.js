import express from "express";

import { users } from "./modules/users/users.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", users);

export default app;
