import { resultOk, resultError } from '../middleware/resultHandler';
import { UserRegisterSchema, UserLoginSchema } from '../models';
import { validation } from '../middleware/validation';
import { usersRepository } from '../repository';
import { verify, hash } from 'argon2';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  if (!req.session.user) {
    return resultError(401, res, 'Unauthorized');
  }
  const user = await usersRepository.getSingleByEmail(req.session.user.email!);
  if (user.isErr) {
    return resultError(500, res, user.error.message);
  }
  return resultOk(user.value, res, `Logged with id: ${user.value?.id}`);
});
userRouter.post(
  '/register',
  validation({ body: UserRegisterSchema }),
  async (req, res) => {
    const passwordHash = await hash(req.body.hashedPassword);
    const user = await usersRepository.createSingle({
      ...req.body,
      hashedPassword: passwordHash,
    });
    if (user.isErr) {
      return resultError(500, res, user.error.message);
    }
    return resultOk(user.value, res, `Created user with id: ${user.value?.id}`);
  }
);

userRouter.post(
  '/login',
  validation({ body: UserLoginSchema }),
  async (req, res) => {
    const user = await usersRepository.getSingleByEmailAuth(req.body.email);
    if (user.isErr) {
      return resultError(500, res, user.error.message);
    }

    const verification = await verify(
      user.value!.hashedPassword,
      req.body.hashedPassword
    );

    if (!verification) {
      return resultError(401, res, 'Wrong password');
    }

    const userData = {
      id: user.value!.id,
      firstName: user.value!.firstName,
      lastName: user.value!.lastName,
      email: user.value!.email,
      phoneNumber: user.value!.phoneNumber,
    };

    req.session.user = userData;
    return resultOk(userData, res, `Logged with id: ${user.value?.id}`);
  }
);

userRouter.post('/logout', async (req, res) => {
  req.session.destroy(() => {});
  return resultOk('', res, `Logged out`);
});

userRouter.get('/:userId/rooms', async (req, res) => {
  const userId = req.params.userId;
  const user = await usersRepository.getUserWithRooms(userId);
  if (user.isErr) {
    return resultError(500, res, user.error.message);
  }

  return resultOk(user.value, res, `Listed user with rooms with ID ${userId}`);
});

userRouter.get('/rooms', async (req, res) => {
  if (!req.session.user) {
    return resultError(401, res, 'Unauthorized');
  }
  const user = await usersRepository.getSingleByEmail(req.session.user.email!);
  if (user.isErr) {
    return resultError(500, res, user.error.message);
  }

  const userRooms = await usersRepository.getUserWithRooms(user.value!.id);
  if (userRooms.isErr) {
    return resultError(500, res, userRooms.error.message);
  }

  return resultOk(
    userRooms.value,
    res,
    `Listed user with rooms with ID ${user.value!.id}`
  );
});

userRouter.get('/bookings/:history?', async (req, res) => {
  if (!req.session.user) {
    return resultError(401, res, 'Unauthorized');
  }
  const user = await usersRepository.getSingleByEmail(req.session.user.email!);
  if (user.isErr) {
    return resultError(500, res, user.error.message);
  }

  let userBookings;
  let outputText = `Listed user with bookings. ID: ${user.value?.id}`;
  if (req.params.history == null) {
    userBookings = await usersRepository.getUserWithBookings(
      user.value!.id,
      false
    );
  } else if (req.params.history === 'history') {
    userBookings = await usersRepository.getUserWithBookings(
      user.value!.id,
      true
    );
    outputText = `Listed user with history bookings. ID: ${user.value?.id}`;
  } else {
    return resultError(404, res, 'Path not found');
  }

  if (userBookings.isErr) {
    return resultError(500, res, userBookings.error.message);
  }
  return resultOk(userBookings.value, res, outputText);
});

export default userRouter;
