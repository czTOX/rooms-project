import z from "zod";

export const RoomPostSchema = z.object({
    caption: z.string(),
    description: z.string(),
    pricePerNight: z.number(),
    locationId: z.string(),
});

export const RoomCreateSchema = z.object({
        userId: z.string(),
        photosUrls: z.string(),
}).merge(RoomPostSchema);

export const RoomSchema = z.object({
    id: z.string(),
}).merge(RoomCreateSchema);

export type RoomPost = z.infer<typeof RoomPostSchema>
export type RoomCreate = z.infer<typeof RoomCreateSchema>;
export type Room = z.infer<typeof RoomSchema>;