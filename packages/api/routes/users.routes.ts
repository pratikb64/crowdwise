import { getUserController } from "@/controllers/users/getUser.controller";
import { Router } from "express";

export const userRoutes = Router();

userRoutes.get("/", getUserController);
