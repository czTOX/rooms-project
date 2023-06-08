import z from "zod";

const RoomSchema = z.object({
    id: z.string(),
    photosUrls: z.string(),
    caption: z.string(),
    description: z.string(),
    pricePerNight: z.number(),
})

export type Room = z.infer<typeof RoomSchema>;