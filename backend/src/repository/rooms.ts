import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Result } from '@badrap/result';
import {Room, RoomCreate} from "../models";
import prisma from "../client";
import Dict = NodeJS.Dict;


export const createSingle = async ( data: RoomCreate ): Promise<Result<Room | null, Error>> => {
    try {
        const room = await prisma.room.create({
            data: {
                description: data.description,
                pricePerNight: data.pricePerNight,
                photosUrls: data.photosUrls,
                caption: data.caption,
                user: {
                    connect: {
                        //id: data.user.id,
                        id: data.userId,
                    },
                },
                location: {
                    connect: {
                        //id: data.location.id,
                        id: data.locationId,
                    },
                },
            },
            include: {
                user: true,
                location: true,
            },
        });
        return Result.ok(room);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
}

export const getAll = async(args: Dict<any>): Promise<Result<Room[], Error>> => {
    // TODO add startDate and endDate filter (offer in range, no bookings)
    try {
        let query = {
            where: {
                locationId: args.location != null ? args.location : undefined,
                offers: args.startDate != null ? {some: {}} : undefined,
                bookings: args.startDate != null ? {none: {}} : undefined,
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
            orderBy: {}
        }
        if (args.sort) {
            if (args.sort === "priceDesc") {
                query.orderBy = {pricePerNight: 'desc'}
            } else if (args.sort === "priceAsc") {
                query.orderBy = {pricePerNight: 'asc'}
            }
        }
        if (args.startDate && args.endDate) {
            query.where.offers!.some = {startDate: {lte: args.startDate}, endDate: {gte: args.endDate}}
            query.where.bookings!.none = {startDate: {gte: args.startDate}, endDate: {lte: args.endDate}}
        }

        const rooms = await prisma.room.findMany(query);
        return Result.ok(rooms);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
};
export const getSingleById = async(id: string, offers?:boolean): Promise<Result<Room | null, Error>> => {
    try {
        let query = {
            where: { id: id },
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
                    offers: false
                }
        }
        if (offers) {
            query = {
                ...query,
                include: {
                    ...query.include,
                    offers: true,
                }
            }
        }

        const room = await prisma.room.findUnique(query);
        return Result.ok(room);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
};