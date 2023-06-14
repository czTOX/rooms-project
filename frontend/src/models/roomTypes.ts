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
    city: z.string(),
    zip: z.string(),
    street: z.string(),
    country: z.string(),
    photosUrls: z.string(),
});

const FilterSchema = z.object({
    search: z.string(),
    location: z.string(),
    minPrice: z.string(),
    maxPrice: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    sort: z.string(),
});

const FilterDatesSchema = z.object({
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
});

export type Room = z.infer<typeof RoomSchema>;
export type NewRoom = z.infer<typeof NewRoomSchema>;
export type Filter = z.infer<typeof FilterSchema>;
export type FilterDates = z.infer<typeof FilterDatesSchema>;