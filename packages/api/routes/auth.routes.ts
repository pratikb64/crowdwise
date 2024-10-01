import { logOutController } from "@/controllers/auth/logOut.controller";
import { loginController } from "@/controllers/auth/login.controller";
import { registerController } from "@/controllers/auth/register.controller";
import { loginModel } from "@/models/auth/login.model";
import { registerModel } from "@/models/auth/register.model";
import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

export const authRoutes = Router();

authRoutes.post(
	"/register",
	validateRequest(registerModel),
	registerController,
);

authRoutes.post("/login", validateRequest(loginModel), loginController);

authRoutes.get("/logout", logOutController);
