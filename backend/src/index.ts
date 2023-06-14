import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import {userController, roomsController, locationsController, bookingsController} from "./controller";
import { User } from "./models"
import cookieParser from "cookie-parser";
import session from "./middleware/session"

declare module "express-session" {
    interface SessionData {user: User}
}

dotenv.config();
const api = express();
const port = process.env.BACKEND_PORT ?? 4000;

api.use(express.json());
api.use(session());
api.use(cookieParser());
api.use(cors(({credentials: true, origin: 'http://localhost:3000'})));


api.use("/users", userController);
api.use("/rooms", roomsController);
api.use("/locations", locationsController);
api.use("/bookings", bookingsController);
api.use('/images', express.static("uploads"));

api.listen(port, () => console.log(`Listening on port ${port}`));