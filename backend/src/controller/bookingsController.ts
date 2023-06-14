import { resultOk, resultError } from '../middleware/resultHandler';
import {BookingPostSchema,  BookingCreate} from "../models";
import { validation } from "../middleware/validation";
import {usersRepository, bookingsRepository} from "../repository";
import {Router, Request} from "express";
import {getUserWithRoomsBookings} from "../repository/users";
import {getSingleById} from "../repository/bookings";
import {bookingsController} from "./index";

const bookingsRouter = Router();

bookingsRouter.get("/", async (req, res) => {
    if(!req.session.user){
        return resultError(401, res, "Unauthorized");
    }
    const user= await usersRepository.getSingleByEmail(req.session.user.email!);
    if (user.isErr) {
        return resultError(500, res, user.error.message);
    }

    const userBookings = await usersRepository.getUserWithRoomsBookings(user.value!.id);
    if (userBookings.isErr) {
        return resultError(500, res, userBookings.error.message);
    }
    return resultOk(userBookings.value, res, `Listed bookings of user: ${user.value!.id}`);
});

bookingsRouter.get("/:bookingId", async (req, res) => {
    if(!req.session.user){
        return resultError(401, res, "Unauthorized");
    }
    const user= await usersRepository.getSingleByEmail(req.session.user.email!);
    if (user.isErr) {
        return resultError(500, res, user.error.message);
    }
    if (user.value === null) {
        return resultError(500, res, "User not found");
    }

    const bookingId = req.params.bookingId;
    const booking = await bookingsRepository.getSingleById(bookingId);
    if (booking.isErr) {
        return resultError(500, res, booking.error.message);
    }
    if (booking.value == null) {
        return resultError(500, res, 'Booking does not exist');
    }
    const bookedById = booking.value.user.id;
    const roomOwnerId = booking.value.room.userId;
    if (user.value.id !== bookedById && user.value.id !== roomOwnerId) {
        return resultError(500, res, 'You cannot view other peoples bookings');
    }
    return resultOk(booking, res, `Listed booking with ID: ${bookingId}`);
});

bookingsRouter.post("/", validation({body: BookingPostSchema}),async (req, res) => {
    if(!req.session.user) {
        return resultError(401, res, "Unauthorized");
    }
    const user= await usersRepository.getSingleByEmail(req.session.user.email!);
    if (user.isErr) {
        return resultError(500, res, user.error.message);
    }
    if (user.value === null) {
        return resultError(500, res, "User not found");
    }

    const booking = await bookingsRepository.createSingle(
        {...req.body, userId: user.value!.id}
    );
    if (booking.isErr) {
        return resultError(500, res, booking.error.message);
    }
    return resultOk(booking.value, res, `Created booking with id: ${booking.value?.id}`);
});

export default bookingsRouter;