import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Result } from '@badrap/result';
import { UserRegister, User, UserAuth } from "../models";
import prisma from "../client";
export const createSingle = async ( data: UserRegister ): Promise<Result<User | null, Error>> => {
    try {
        const user = await prisma.user.create({
            data: data,
            select:{
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phoneNumber: true,
            }});
        return Result.ok(user);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
};
export const getSingleByEmail = async(email: string): Promise<Result<User | null, Error>> => {
    const user = await getSingleByEmailAuth(email);
    if(user.isErr){
        return user;
    }
    const userData = {
        id: user.value!.id,
        firstName: user.value!.firstName,
        lastName: user.value!.lastName,
        email: user.value!.email,
        phoneNumber: user.value!.phoneNumber,
    }
    return Result.ok(userData);
};

export const getSingleByEmailAuth = async(email: string): Promise<Result<UserAuth | null, Error>> => {
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
        const query = {
            where: { id: id },
            select: {
                email: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
                id: true,
                rooms: {
                    include: {
                        location: true,
                    }
                }
            }
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

export const getUserWithBookings = async(id: string, history: boolean): Promise<Result<User | null, Error>> => {
    try {
        let query =
            {
                select: {
                    email: true,
                    firstName: true,
                    lastName: true,
                    phoneNumber: true,
                    id: true,
                    bookings: {
                        where: {
                            endDate: {}
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
            query.select.bookings.where.endDate = {lt: new Date()}
        } else {
            query.select.bookings.where.endDate = {gte: new Date()}
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

export const getUserWithRoomsBookings = async(id: string): Promise<Result<User | null, Error>> => {
    try {
        const query = {
            where: { id: id },
            select: {
                email: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
                id: true,
                hashedPassword: false,
                rooms: {
                    include: {
                        location: true,
                        bookings: {
                            orderBy: {
                                startDate: 'desc' as const
                            }
                        }
                    }
                }
            }
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