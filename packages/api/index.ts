import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { homeController } from "./controllers/home.controller";
import { SERVER_PORT } from "./env";
import { routes } from "./routes";

try {
	//
	const app = express();

	// Middleware
	app.use(cors({ origin: "*" }));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cookieParser());

	// Routes
	app.get("/", homeController);
	app.use("/v1", routes);
	app.listen(SERVER_PORT, () => {
		console.log(`Server is running on port ${SERVER_PORT}`);
	});

	//
} catch (error) {
	console.log("🔴Uncaught error🔴 : ", error);
}
