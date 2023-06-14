import z from "zod";

export const RoomPostSchema = z.object({
    caption: z.string({ required_error: 'Missing `caption` parameter'}).nonempty(),
    description: z.string({ required_error: 'Missing `description` parameter'}).nonempty(),
    pricePerNight: z.number({ required_error: 'Missing `pricePerNight` parameter'}),
    locationId: z.string({ required_error: 'Missing `locationId` parameter'}).nonempty(),
});

export const RoomCreateSchema = z.object({
        userId: z.string({ required_error: 'Missing `userId` parameter'}).nonempty(),
        photosUrls: z.string({ required_error: 'Missing `photosUrls` parameter'}).nonempty(),
}).merge(RoomPostSchema);

export const RoomSchema = z.object({
    id: z.string().nonempty(),
}).merge(RoomCreateSchema);

export type RoomPost = z.infer<typeof RoomPostSchema>
export type RoomCreate = z.infer<typeof RoomCreateSchema>;
export type Room = z.infer<typeof RoomSchema>;