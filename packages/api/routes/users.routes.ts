import { getUserController } from "@/controllers/users/getUser.controller";
import { auth } from "@/middlewares/auth";
import { Router } from "express";

export const userRoutes = Router();

userRoutes.get("/", auth(), getUserController);
