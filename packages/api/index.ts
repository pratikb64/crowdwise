import cors from "cors";
import express from "express";
import { homeController } from "./controllers/homeController";
import { SERVER_PORT } from "./utils/constants";

const app = express();

try {
	//

	// Middleware
	app.use(cors({ origin: "*" }));
	app.use(express.urlencoded({ extended: true }));

	// Routes
	app.use("/", homeController);

	app.listen(SERVER_PORT, () => {
		console.log(`Server is running on port ${SERVER_PORT}`);
	});

	//
} catch (error) {
	console.log("🔴Uncaught error🔴 : ", error);
	app.use((_, res) => {
		res.status(500).json({
			message: "Internal Server Error",
		});
	});
}
