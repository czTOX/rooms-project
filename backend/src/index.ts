import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { userController, roomsController } from "./controller";

dotenv.config();
const api = express();
const port = process.env.BACKEND_PORT ?? 4000;

api.use(express.json());
api.use(cors());

api.use("/users", userController);
api.use("/rooms", roomsController);

api.listen(port, () => console.log(`Listening on port ${port}`));