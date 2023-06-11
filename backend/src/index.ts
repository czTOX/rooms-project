import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { userController, roomsController, locationsController } from "./controller";
import cookieParser from "cookie-parser";
import session from "./middleware/session"

declare module "express-session" {
    interface SessionData {user: {firstName: string, lastName: string, email: string, phoneNumber: string}}
}

dotenv.config();
const api = express();
const port = process.env.BACKEND_PORT ?? 4000;

api.use(express.json());
api.use(session());
api.use(cookieParser());
api.use(cors());

api.use("/users", userController);
api.use("/rooms", roomsController);
api.use("/locations", locationsController);

api.listen(port, () => console.log(`Listening on port ${port}`));