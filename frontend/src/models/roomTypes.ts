import { z } from "zod";

const RoomSchema = z.object({
    id: z.string(),
    userId: z.string(),
    caption: z.string(),
    description: z.string(),
    pricePerNight: z.number(),
    photosUrls: z.string(),
    locationId: z.string(),
});

const NewRoomSchema = z.object({
    caption: z.string(),
    description: z.string(),
    pricePerNight: z.number(),
    photosUrls: z.string(),
});

const FilterSchema = z.object({
    search: z.string().nullable(),
    location: z.string().nullable(),
    minPrice: z.number().nullable(),
    maxPrice: z.number().nullable(),
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
});

const FilterWithoutDateSchema = z.object({
    search: z.string().nullable(),
    location: z.string().nullable(),
    minPrice: z.number().nullable(),
    maxPrice: z.number().nullable(),
});

export type Room = z.infer<typeof RoomSchema>;
export type NewRoom = z.infer<typeof NewRoomSchema>;
export type Filter = z.infer<typeof FilterSchema>;
export type FilterWithoutDate = z.infer<typeof FilterWithoutDateSchema>;