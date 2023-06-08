import { resultOk, resultError } from '../middleware/resultHandler';
import { UserRegisterSchema, UserLoginSchema } from "../models";
import { validation } from "../middleware/validation";
import { usersRepository } from "../repository";
import { verify, hash } from "argon2";
import { Router } from "express";

const userRouter = Router();

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
    console.log("logged");
    return resultOk(user.value, res,`Logged with id: ${user.value?.id}`);
});

userRouter.post("/logout", async (req, res) => {

});

export default userRouter;
