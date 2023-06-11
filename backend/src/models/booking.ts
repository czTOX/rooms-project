import z from "zod";

export const BookingPostSchema = z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    totalPrice: z.number(),
})

export const BookingCreateSchema = z.object({
    userId: z.string(),
    roomId: z.string(),
}).merge(BookingPostSchema)

export const BookingSchema = z.object({
    id: z.string().nonempty(),
}).merge(BookingCreateSchema)

export type BookingPost = z.infer<typeof BookingPostSchema>;
export type BookingCreate = z.infer<typeof BookingCreateSchema>;
export type Booking = z.infer<typeof BookingSchema>;