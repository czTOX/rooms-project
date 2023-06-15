import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Result } from '@badrap/result';
import {Location, LocationCreate} from "../models";
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

export const getSingle = async ( data: LocationCreate ): Promise<Result<Location | null, Error>> => {
    try {
        const location = await prisma.location.findFirst({
            where: data,
        });
        return Result.ok(location);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
}

export const getIdOrCreateSingle = async ( data: LocationCreate ): Promise<Result<string, Error>> => {
    try {
        let location = await getSingle(data);
        if(!location.isErr && location.value){
            return Result.ok(location.value.id);
        }

        location = await createSingle(data);
        if(!location.isErr && location.value){
            return Result.ok(location.value.id);
        }

        return Result.err(new Error("Unknown error: getIdOrCreateSingle"));
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
}