import z from "zod";
import {UserSchema} from "./user";
import {LocationSchema} from "./location";

export const RoomCreateSchema = z.object({
    photosUrls: z.string(),
    caption: z.string(),
    description: z.string(),
    pricePerNight: z.number(),
    userId: z.string(),
    locationId: z.string(),
});
export const RoomSchema = z.object({
    id: z.string(),
}).merge(RoomCreateSchema);

export type RoomCreate = z.infer<typeof RoomCreateSchema>;
export type Room = z.infer<typeof RoomSchema>;