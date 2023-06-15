import { resultOk, resultError } from '../middleware/resultHandler';
import { BookingPostSchema } from '../models';
import { validation } from '../middleware/validation';
import {
  usersRepository,
  bookingsRepository,
  roomsRepository,
} from '../repository';
import { Router } from 'express';

const bookingsRouter = Router();

bookingsRouter.get('/', async (req, res) => {
  if (!req.session.user) {
    return resultError(401, res, 'Unauthorized');
  }
  const user = await usersRepository.getSingleByEmail(req.session.user.email!);
  if (user.isErr) {
    return resultError(500, res, user.error.message);
  }

  const userBookings = await usersRepository.getUserWithRoomsBookings(
    user.value!.id
  );
  if (userBookings.isErr) {
    return resultError(500, res, userBookings.error.message);
  }
  return resultOk(
    userBookings.value,
    res,
    `Listed bookings of user: ${user.value!.id}`
  );
});

bookingsRouter.get('/:bookingId', async (req, res) => {
  if (!req.session.user) {
    return resultError(401, res, 'Unauthorized');
  }
  const user = await usersRepository.getSingleByEmail(req.session.user.email!);
  if (user.isErr) {
    return resultError(500, res, user.error.message);
  }
  if (user.value === null) {
    return resultError(500, res, 'User not found');
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

bookingsRouter.post(
  '/',
  validation({ body: BookingPostSchema }),
  async (req, res) => {
    if (!req.session.user) {
      return resultError(401, res, 'Unauthorized');
    }
    const user = await usersRepository.getSingleByEmail(
      req.session.user.email!
    );
    if (user.isErr) {
      return resultError(500, res, user.error.message);
    }
    if (user.value === null) {
      return resultError(500, res, 'User not found');
    }

    if (req.body.endDate != undefined && req.body.startDate !== undefined) {
      if (req.body.endDate <= req.body.startDate) {
        return resultError(
          500,
          res,
          'End date is before or same as start date'
        );
      } else if (
        req.body.endDate.getTime() < new Date().setHours(0, 0, 0, 0) ||
        req.body.startDate.getTime() < new Date().setHours(0, 0, 0, 0)
      ) {
        return resultError(500, res, 'Cannot book for date before today');
      }
    }

    const room = await roomsRepository.getSingleById(req.body.roomId);
    if (room.isErr) {
      return resultError(500, res, room.error.message);
    }
    if (room.value == null) {
      return resultError(500, res, 'Cant find the room');
    }
    const pricePerNight = room.value.pricePerNight;
    const diff = Math.abs(
      req.body.startDate.getTime() - req.body.endDate.getTime()
    );
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    if (diffDays * pricePerNight > req.body.totalPrice) {
      req.body.totalPrice = diffDays * pricePerNight;
    }

    const booking = await bookingsRepository.createSingle({
      ...req.body,
      userId: user.value!.id,
    });

    if (booking.isErr) {
      return resultError(500, res, booking.error.message);
    }
    return resultOk(
      booking.value,
      res,
      `Created booking with id: ${booking.value?.id}`
    );
  }
);

export default bookingsRouter;
