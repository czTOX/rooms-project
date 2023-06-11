import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Result } from '@badrap/result';
import {Booking, BookingCreate} from "../models";
import prisma from "../client";

export const createSingle = async ( data: BookingCreate ): Promise<Result<Booking | null, Error>> => {
    // TODO AUTH
    // TODO check if offers are open in this date range
    // TODO check if there are no other bookings in this date range
    try {
        const booking = await prisma.booking.create({
            data: {
                startDate: data.startDate,
                endDate: data.endDate,
                totalPrice: data.totalPrice,
                user: {
                    connect: {
                        id: data.userId,
                    },
                },
                room: {
                    connect: {
                        id: data.roomId,
                    },
                },
            },
            include: {
                user: true,
                room: true,
            },
        });
        return Result.ok(booking);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
}