import { z } from "zod";

const RoomSchema = z.object({
    caption: z.string(),
    description: z.string(),
    pricePerNight: z.number(),
    photosUrls: z.string(),
});

export type Room = z.infer<typeof RoomSchema>;