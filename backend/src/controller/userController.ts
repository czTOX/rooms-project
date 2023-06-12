import { resultOk, resultError } from '../middleware/resultHandler';
import { UserRegisterSchema, UserLoginSchema } from "../models";
import { validation } from "../middleware/validation";
import { usersRepository } from "../repository";
import { verify, hash } from "argon2";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/", async(req, res) =>{
    if(!req.session.user){
        return resultError(401, res, "Unauthorized");
    }
    const user= await usersRepository.getSingleByEmail(req.session.user.email!);
    if (user.isErr) {
        return resultError(500, res, user.error.message);
    }
    return resultOk(user.value, res,`Logged with id: ${user.value?.id}`);
})
userRouter.post("/register", validation({ body: UserRegisterSchema }), async (req, res) => {
    const passwordHash = await hash(req.body.hashedPassword);
    const user = await usersRepository.createSingle(
        { ...req.body, hashedPassword: passwordHash });
    if (user.isErr) {
        return resultError(500, res, user.error.message);
    }
    return resultOk(user.value, res,`Created user with id: ${user.value?.id}`);
});

userRouter.post("/login", validation({ body: UserLoginSchema }), async (req, res) => {
    const user= await usersRepository.getSingleByEmail(req.body.email);
    if (user.isErr) {
        return resultError(500, res, user.error.message);
    }
    const verification= await verify(user.value!.hashedPassword, req.body.hashedPassword);
    if(!verification) {
        return resultError(401, res, "Wrong password");
    }
    const data = user.value;
    req.session.user = {
        firstName: data!.firstName,
        lastName: data!.lastName,
        email: data!.email,
        phoneNumber: data!.phoneNumber}
    return resultOk(user.value, res,`Logged with id: ${user.value?.id}`);
});

userRouter.post("/logout", async (req, res) => {
    req.session.destroy(() => {});
    return resultOk("", res,`Logged out`);
});

userRouter.get("/:userId/rooms",  async (req, res) => {
    const userId = req.params.userId
    const user = await usersRepository.getUserWithRooms(userId)
    if (user.isErr) {
        return resultError(500, res, user.error.message);
    }

    return resultOk(user.value, res, `Listed user with rooms with ID ${userId}`)
});

userRouter.get("/:userId/bookings/:history?", async (req, res) => {
    if(!req.session.user){
        return resultError(401, res, "Unauthorized");
    }
    const user= await usersRepository.getSingleByEmail(req.session.user.email!);
    if (user.isErr) {
        return resultError(500, res, user.error.message);
    }
    const userId = req.params.userId
    if (userId !== user.value?.id) {
        return resultError(500, res, "You cannot see other users bookings");
    }

    let userBookings;
    let outputText = `Listed user with bookings. ID: ${userId}`;
    if (req.params.history == null) {
        userBookings = await usersRepository.getUserWithBookings(userId, false);
    } else if (req.params.history === 'history') {
        userBookings = await usersRepository.getUserWithBookings(userId, true);
        outputText = `Listed user with history bookings. ID: ${userId}`;
    } else {
        return resultError(404, res, "Path not found");
    }

    if (userBookings.isErr) {
        return resultError(500, res, userBookings.error.message);
    }
    return resultOk(userBookings.value, res, outputText);
});


export default userRouter;