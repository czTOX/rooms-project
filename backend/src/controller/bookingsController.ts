import { resultOk, resultError } from '../middleware/resultHandler';
import {BookingPostSchema,  BookingCreate} from "../models";
import { validation } from "../middleware/validation";
import {usersRepository} from "../repository";
import {Router, Request} from "express";

const bookingsRouter = Router();

bookingsRouter.get("/", async (req, res) => {
    if(!req.session.user){
        return resultError(401, res, "Unauthorized");
    }
    const user= await usersRepository.getSingleByEmail(req.session.user.email!);
    if (user.isErr) {
        return resultError(500, res, user.error.message);
    }
})

bookingsRouter.get("/:bookingId", async (req, res) => {

})

bookingsRouter.post("/", async (req, res) => {

})

export default bookingsRouter;