import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Result } from '@badrap/result';
import { Room } from "../models";
import prisma from "../client";

export const getAll = async(): Promise<Result<Room[], Error>> => {
    try {
        const rooms = await prisma.room.findMany();
        return Result.ok(rooms);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
};
export const getSingleById = async(id: string): Promise<Result<Room | null, Error>> => {
    try {
        const room = await prisma.room.findUnique({
            where: { id },
        });
        return Result.ok(room);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
};