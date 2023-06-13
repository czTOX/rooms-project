import { z } from "zod";

export const NewBookingSchema = z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    totalPrice: z.number(),
})

export const BookingSchema = z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    totalPrice: z.number(),
    userId: z.string(),
    roomId: z.string(),
})

export type NewBooking = z.infer<typeof NewBookingSchema>;
export type Booking = z.infer<typeof BookingSchema>;