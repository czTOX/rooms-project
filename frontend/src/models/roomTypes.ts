import { z } from "zod";

const NewRoomFormSchema = z.object({
    caption: z.string(),
    description: z.string(),
    pricePerNight: z.number(),
    photosUrls: z.string(),
});

export type NewRoomForm = z.infer<typeof NewRoomFormSchema>;