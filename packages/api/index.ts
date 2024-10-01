import cookieParser from "cookie-parser";
import cors, { type CorsOptions } from "cors";
import express from "express";
import { homeController } from "./controllers/home.controller";
import { SERVER_PORT } from "./env";
import { routes } from "./routes";

const whitelist = ["http://localhost:3000"];
const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		if (origin && whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
};

try {
	//
	const app = express();

	// Middleware
	app.use(cors(corsOptions));
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
