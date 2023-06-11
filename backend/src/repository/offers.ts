import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Result } from '@badrap/result';
import {Offer, OfferCreate} from "../models";
import prisma from "../client";

export const createSingle = async ( data: OfferCreate ): Promise<Result<Offer | null, Error>> => {
    try {
        const offer = await prisma.offer.create({
            data: {
                startDate: data.startDate,
                endDate: data.endDate,
                room: {
                    connect: {
                        id: data.roomId,
                    },
                },
            },
        });
        return Result.ok(offer);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
}