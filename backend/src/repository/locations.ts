import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Result } from '@badrap/result';
import {Location, LocationCreate, Room, RoomCreate} from "../models";
import prisma from "../client";


export const getAll = async(): Promise<Result<Location[], Error>> => {
    try {
        let query = {}

        const location = await prisma.location.findMany(query);
        return Result.ok(location);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
};

export const createSingle = async ( data: LocationCreate ): Promise<Result<Location | null, Error>> => {
    try {
        const location = await prisma.location.create({
            data: data,
        });
        return Result.ok(location);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
}