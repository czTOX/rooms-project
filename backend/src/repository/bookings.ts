import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Result } from '@badrap/result';
import {Booking, BookingCreate, BookingUser} from "../models";
import prisma from "../client";

export const createSingle = async ( data: BookingCreate ): Promise<Result<Booking | null, Error>> => {
    try {
        const room = await prisma.room.findMany({
            where: {
                id: data.roomId,
                offers: {
                    some: {startDate: {lte: data.startDate}, endDate: {gte: data.endDate}}
                },
                bookings: {
                    none: {startDate: {lte: data.endDate}, endDate: {gte: data.startDate}}
                }
            },
            include:
                {
                    user: {
                        select: {
                            firstName: true,
                            lastName: true,
                            id: true,
                        }
                    },
                    location: true,
                },
        });

        if (room.length < 1) {
            return Result.err(new Error("Room is already booked or no offer is open in this date"));
        }

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
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        id: true,
                    }
                },
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

export const getSingleById = async(id: string): Promise<Result<BookingUser | null, Error>> => {
    try {
        const booking = await prisma.booking.findFirst(
            {
                where: { id },
                include: {
                    room: {
                        include: {
                            user: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                    id: true,
                                }
                            }
                        }
                    },
                    user: {
                        select: {
                            firstName: true,
                            lastName: true,
                            id: true,
                            phoneNumber: true,
                            email: true
                        }
                    }
                }
            });
        if(!booking){
            return Result.err(new Error("Booking does not exist"));
        }
        return Result.ok(booking);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
}
