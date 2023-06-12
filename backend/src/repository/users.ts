import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Result } from '@badrap/result';
import { UserRegister, User } from "../models";
import prisma from "../client";
export const createSingle = async ( data: UserRegister ): Promise<Result<User | null, Error>> => {
    try {
        const user = await prisma.user.create({ data });
        return Result.ok(user);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
};

export const getSingleByEmail = async(email: string): Promise<Result<User | null, Error>> => {
    try {
        const user = await prisma.user.findFirst({ where: { email } });
        if(!user){
            return Result.err(new Error("User not exist"));
        }
        return Result.ok(user);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
}

export const getUserWithRooms = async(id: string): Promise<Result<User | null, Error>> => {
    try {
        const user = await prisma.user.findFirst(
            {
                where: { id: id },
                include: {
                    rooms: {
                        include: {
                            location: true
                        }
                    }
                }
            });

        if(!user){
            return Result.err(new Error("User does not exist"));
        }
        return Result.ok(user);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
}

export const getUserWithBookings = async(id: string, history: boolean): Promise<Result<User | null, Error>> => {
    try {
        let query =
            {
                include: {
                    bookings: {
                        where: {
                            startDate: {}
                        },
                        include: {
                            room: true,
                        },
                        orderBy: {
                            startDate: 'desc' as const
                        }
                    },
                },
                where: {
                    id: id,
                },
            }

        if (history) {
            query.include.bookings.where.startDate = {lt: new Date()}
        } else {
            query.include.bookings.where.startDate = {gte: new Date()}
        }

        const user = await prisma.user.findFirst(query);

        if(!user){
            return Result.err(new Error("User does not exist"));
        }
        return Result.ok(user);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
}