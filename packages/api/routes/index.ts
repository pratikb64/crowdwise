import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { boardsRoutes } from "./boards.routes";
import { commentsRoutes } from "./comments.routes";
import { companiesRoutes } from "./companies.route";
import { postsRoutes } from "./posts.routes";
import { userRoutes } from "./users.routes";
export const routes = Router();

routes.use("/", authRoutes);

routes.use("/users", userRoutes);

routes.use("/companies", companiesRoutes);

routes.use("/boards", boardsRoutes);

routes.use("/posts", postsRoutes);

routes.use("/comments", commentsRoutes);
